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
        public IEnumerable<Customer> Getby(int id)
        {
            var result= _customersCollection.Find(s => s.IdNumber == id).ToList();
            if (result != null)
                return result;
            else
            {
                return (IEnumerable<Customer>)NotFound($"Customer with id:{id} was not found");
        
            }


        }

        [HttpPost]
        [Route("[controller]")]
        public void Post(Customer customerNew)
        {

             _customersCollection.InsertOne(customerNew);
        }


    }
}

