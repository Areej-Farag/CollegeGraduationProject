const mongoose = require("mongoose");

// الاتصال بقاعدة البيانات
mongoose
  .connect("mongodb+srv://rerefarag60:Areg002oo2@cluster0.8dtlv.mongodb.net/experimentDB")
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

// تعريف Schema للأدوات المستخدمة في التجربة
const toolSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  animation: String,
});

// تعريف Schema للمعاملات (Parameters)
const parameterSchema = new mongoose.Schema({
  name: String,
  unit: String,
  symbol: String,
  properties: {
    atomicStructure: String,
    color: String,
    smell: String,
    state: String,
  },
  constraints: {
    minValue: Number,
    maxValue: Number,
  },
});

// تعريف Schema للمعادلات (Equations)
const equationSchema = new mongoose.Schema({
  eqFormula: {
    inputs: [
      {
        operand: { type: mongoose.Schema.Types.ObjectId, ref: "Parameter", required: true },
        operator: { type: String, enum: ["+", "-", "*", "/" , "->"], required: false } 
      }
    ],
    output: [{ type: mongoose.Schema.Types.ObjectId, ref: "Parameter", required: true }] 
  },
  description: String,
  measurementUnit: String,
  operands: [String],
  catalyst: String,
});

// تعريف Schema للتجربة العلمية (Experiment)
const experimentSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  name: String,
  description: String,
  domain: String,
  subDomain: String,
  observation: [
    {
      question: { type: String, required: true },  // نص السؤال
      options: [{ type: String, required: true }],  // الاختيارات
    }
  ],
  results: [
    {
      question: { type: String },   
    }
  ],
  basedOn: String,
  steps: [
    {
      verb: { type: String, required: true },
      attrs: [
        {
          key: { type: String, required: true },  // نوع البيانات (مثلاً المادة، الكمية، الأداة...)
          value: { type: mongoose.Schema.Types.Mixed, required: true } // القيمة (مثلاً "5g", "100°C", "beaker")
        }
      ]
    }
  ],
  tools: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tool" }],
  parameters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Parameter" }],
  equations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Equation" }],
});

// تعريف النماذج (Models)
const Tool = mongoose.model("Tool", toolSchema);
const Parameter = mongoose.model("Parameter", parameterSchema);
const Equation = mongoose.model("Equation", equationSchema);
const Experiment = mongoose.model("Experiment", experimentSchema);


