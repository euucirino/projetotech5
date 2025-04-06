import express from 'express';
import sequelize from './config/database';
import userModel from './models/userModel';
import productModel from './models/productModel';
import commentModel from './models/commentModel';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import commentRoutes from './routes/commentRoutes';
import loginRoutes from "./routes/loginRoutes";

const app = express();
const port = 3000;

app.use(express.json());


app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', commentRoutes);
app.use("/auth", loginRoutes);


productModel.hasMany(commentModel, { foreignKey: 'productId' });
userModel.hasMany(commentModel, { foreignKey: 'userId' });
commentModel.belongsTo(productModel, { foreignKey: 'productId' });
commentModel.belongsTo(userModel, { foreignKey: 'userId' });


app.get('/', (req, res) => {
  res.send('Hello, World! :)');
});


sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Database sincronizado com sucesso');
  })
  .catch((error) => {
    console.log('Erro ao sincronizar o banco de dados:', error);
  });


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
