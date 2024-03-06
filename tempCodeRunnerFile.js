import {MongoClient} from 'mongodb';
import express from 'express';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json());

app.listen(5000);
async function main(){

    const url="mongodb+srv://beldan:ilovelaraLOL20@cluster0.zatwth5.mongodb.net/Driver Info?retryWrites=true&w=majority";
    
    const client= new MongoClient(url);

    try{
        await client.connect();
        app.get('/Searchbyid', (req,res)=>{
             displayDriver(client, req, res);
        });
    }
    catch(err){
        console.log(err);
    }
}
 

main().catch(console.error);

async function displayDriver(client, req, res){
   // const cursor= await client.db("Pen").collection("Driver Info").find({ 
       // licenseID:{ $eq:req.body.licenseId }//gather from collection based on equality with this field's value
 // });
 const variable = req.body.licenseID
 const cursor = await client.db('Pen').collection('Driver Info').aggregate([
    {
      $lookup: {
        from: 'Penalty Info',
        let: { licenseID: variable },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$licenseID', variable] }//left element is the penalty one and right is the driver
                 
                ]
              }
            }
          }
        ],
        as: 'SearchResults'
      }
    },
    {
      $match: {
        $and: [

          { 'licenseID': { $exists: true } }
        ]
      }
    },
    //{
      //$limit: parseInt(req.body.limit)
    //}
  ]);

    await cursor.forEach((myDoc) => {
          res.send(myDoc);
     });
};