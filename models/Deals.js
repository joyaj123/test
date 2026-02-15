const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    dealNumber: {
      type: String,
      required: true,
      unique: true,
    },

    investorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "investors",
      required: true,
      index: true,
    },

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"],
      required: true,
      index: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },

    completedAt: {
      type: Date,
    },

   
    // Investment Details (Embedded)
    
    investment: {
      amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
      },

      currency: {
        type: String,
        required: true,
      },

      sharesAcquired: {
        type: Number,
        required: true,
      },

      ownershipPercentage: {
        type: Number,
        required: true,
      },

      pricePerShare: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
      },

      pricePerPercent: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
      },
    },

    // Company Snapshot (Denormalized)
    companySnapshot: {
      name: {
        type: String,
        required: true,
      },

      sectorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sectors",
        required: true,
      },

      valuation: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
      },

      arr: {
        type: mongoose.Schema.Types.Decimal128,
      },
    },

    // Payment Info (Embedded)
    payment: {
      method: {
        type: String,
        enum: ["WALLET", "BANK_TRANSFER", "CARD", "CRYPTO"],
        required: true,
      },

      transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "transactions",
      },

      paidAt: Date,

      paymentReference: String,
    },

    // Admin Actions (Embedded Array)
    adminActions: [
      {
        adminId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "admins",
          required: true,
        },

        action: {
          type: String,
          enum: ["APPROVED", "REJECTED", "FLAGGED", "REVIEWED"],
          required: true,
        },

        notes: String,

        timestamp: {
          type: Date,
          required: true,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true } // handles createdAt & updatedAt automatically
);

dealSchema.pre('save', async function(next) {//.pre('save') y3ne ABEL ma 2a3mel save bi chayek 
  try {
    // Check investor
    const investor = await mongoose.model('investors').findById(this.investorId);
    if (!investor) throw new Error(`Investor ${this.investorId} not found`);
    
    // Check company
    const company = await mongoose.model('companies').findById(this.companyId);
    if (!company) throw new Error(`Company ${this.companyId} not found`);
    
    // Check sector
    if (this.companySnapshot?.sectorId) {
      const sector = await mongoose.model('sectors').findById(this.companySnapshot.sectorId);
      if (!sector) throw new Error(`Sector ${this.companySnapshot.sectorId} not found`);
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

//findOneAndUpdate = MONGOOSE FUNCTION NAME (built-in)
dealSchema.pre('findOneAndUpdate', async function(next) { //async la2enno im waiting for database checks 
  try {
    const update = this.getUpdate(); //get what i am updating 
    
    if (update.investorId) {
      const investor = await mongoose.model('investors').findById(update.investorId);
      if (!investor) throw new Error(`Investor ${update.investorId} not found`);
    }
    
    if (update.companyId) {
      const company = await mongoose.model('companies').findById(update.companyId);
      if (!company) throw new Error(`Company ${update.companyId} not found`);
    }
    
    next();
  } catch (error) {
    next(error);
  }
});


module.exports = mongoose.model("Deal", dealSchema);
