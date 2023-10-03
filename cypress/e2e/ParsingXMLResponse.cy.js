const xml2js = require("xml2js");
const x2jParser = new xml2js.Parser({ explicitArray: false });

describe("XML Parser", () => {
  const xmlPayload =
    "<?xml version='1.0' encoding='UTF-8'?><Pet><id>0</id><Category><id>0</id><name>MyCat</name></Category><name>doggie</name><photoUrls><photoUrl>string</photoUrl></photoUrls><tags><Tag><id>0</id><name>string</name></Tag></tags><status>available</status></Pet>";
  let petId = null;
  before("Create a Pet", () => {
    cy.request({
      method: "POST",
      url: "https://petstore.swagger.io/v2/pet",
      body: xmlPayload,
      headers: {
        "Content-Type": "application/xml",
        accept: "application/xml",
      },
    }).then((res) => {
      expect(res.status).to.equal(200);

      x2jParser.parseString(res.body, (err, result) => {
        if (!err) {
          petId = result.Pet.id;
        } else {
          throw err;
        }
      });
    });
  });

  it("Fatching Pet data-parsing XML Response", () => {
    cy.request({
      method: "GET",
      url: "https://petstore.swagger.io/v2/pet/" + petId,
      headers:{
        accept:'application/xml'

      }  


    }).then((res) => {
      expect(res.status).to.equal(200);
      x2jParser.parseString(res.body, (err, result)=>{
        expect(result.Pet.id).equal(petId);
        expect(result.Pet.name).equal("doggie");



      })
    });
  });
});
