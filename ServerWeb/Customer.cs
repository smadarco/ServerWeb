using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace ServerWeb
{
    [BsonIgnoreExtraElements]
    public class Customer
    {
        [BsonId]
        public ObjectId Id { get; set; }

        

        [BsonElement("id_number")]
        public Int32 IdNumber { get; set; }

        [BsonElement("username")]
        public string Username { get; set; }

        [BsonElement("email")]
        public string Email { get; set; }

        [BsonElement("birthdate")]
        public DateTime Birthdate { get; set; }
    }
}



