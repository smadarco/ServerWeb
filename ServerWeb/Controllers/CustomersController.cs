using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerWeb.Controllers
{
    [ApiController]
   
    public class CustomersController : ControllerBase
    {
        private IMongoCollection<Customer> _customersCollection;

        public CustomersController(IMongoClient client)
        {
            var database = client.GetDatabase("sample_analytics");
            _customersCollection = database.GetCollection<Customer>("customers");
        }


        


        [HttpGet]
        [Route("[controller]")]

        public IEnumerable<Customer> Get()
        {
            return _customersCollection.Find(customer=>true).ToList();

        }


        [HttpGet("Getby/{id}")]
        [Route("[controller]")]
        public IEnumerable<Customer> Getby(string id)
        {
            return _customersCollection.Find(s => s.Id == id).ToList();

            
        }

        [HttpPost]
        [Route("[controller]")]
        public void Post(Customer[] customer)
        {
            if (customer[0].Id != "")
            {
                var result = _customersCollection.Find(s => s.Id == customer[0].Id).ToList();
                if (result.Count != 0)//edit
                {
                    _customersCollection.ReplaceOne(b => b.Id == result[0].Id, customer[0]);
                }
            }
            else//add
            {
                _customersCollection.InsertOne(customer[0]);
            }
           
        }

        [HttpDelete("delete/{id}")]
        [Route("[controller]")]
        public void Delete(string id)
        {

            _customersCollection.DeleteOne(s => s.Id == id);

        }


        }
    }

