const Sequelize = require('sequelize');

const sequelize = new Sequelize('sequelize_db','root','Saju@1996',{
    host: 'localhost',
    dialect:'mysql'
})

//for checking whether connected perfectly
sequelize.authenticate().then(()=>{
    console.log('connection successfull!!');
}).catch((err)=>{
    console.log('error connecting to database');
})

// defining a table in the db we hav already created
const User = sequelize.define('user',{       
    user_id:{                                 
       type: Sequelize.DataTypes.INTEGER,
       primaryKey:true,
       autoIncrement:true,
       allowNull:false
     },
    user_name:{
        type: Sequelize.DataTypes.STRING,
        allowNull:false
    },
    password:{
        type: Sequelize.DataTypes.STRING,
        allowNull:false
    },
    age:{
        type:Sequelize.DataTypes.INTEGER

    }
},{
    freezeTableName:true,   //to avoid auto setting the table name by sequelize
    timestamps:false        // to avoid the columns createdat and updatedAt which is set automatically
})

//deletion of the table:-
User.drop().then(() => {
    console.log('Table deleted successfully');
  }).catch((err) => {
    console.log(err);
  });

  
User.sync({alter:true}).then(()=>{

 // Adding datas to the table:-
   return User.create({
    user_name:'Sajla',
    password:"sajlaoms",
    age:26
   }) ;

}).then(()=>{

    //Adding second entry:-
     return User.create({
        user_name:'Ebi',
        password:'sheraz',
        age:2
     })

}).then((data)=>{      

     console.log('table and columns synced successfully');
     data.user_name = 'saf';                 //to change the current column values
     data.password = 'safwan';
     data.age = 29;
     return data.save();
   // return data.reload();               //to get the older values back
   // return data.destroy();              // to delete the new value
    
}).then((data)=>{

 console.log('user updatd!!');

}).catch((err)=>{
    console.log(err);
})

  
 
