import express from 'express';
import sequelize from './config/database';
import userModel from './models/userModel';
import productModel from './models/productModel';
import commentModel from './models/commentModel';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import commentRoutes from './routes/commentRoutes';

const app = express();
const port = 3000;

app.use(express.json());

// Rotas com prefixo /api
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', commentRoutes);

// Relacionamentos
productModel.hasMany(commentModel, { foreignKey: 'productId' });
userModel.hasMany(commentModel, { foreignKey: 'userId' });
commentModel.belongsTo(productModel, { foreignKey: 'productId' });
commentModel.belongsTo(userModel, { foreignKey: 'userId' });

// Rota padrão
app.get('/', (req, res) => {
  res.send('Hello, World! :)');
});

// Conexão com banco de dados
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Database sincronizado com sucesso');
  })
  .catch((error) => {
    console.log('Erro ao sincronizar o banco de dados:', error);
  });

// Inicializa servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
