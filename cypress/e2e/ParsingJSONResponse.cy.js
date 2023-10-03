
describe("Parsing JSON Response", () => {
  it("Parsing Simple JSON Response", () => {
    cy.request({
      method: "GET",
      url: "http://fakestoreapi.com/products",
    }).then((reqsponse) => {
      expect(reqsponse.status).to.equal(200);
      expect(reqsponse.body[0].id).to.equal(1);
      expect(reqsponse.body[0].rating).to.deep.equal({
        rate: 3.9,
        count: 120,
      });
      expect(reqsponse.body[0].rating.rate).equal(3.9);
      expect(reqsponse.body[1].title).equal(
        "Mens Casual Premium Slim Fit T-Shirts "
      );

      expect(reqsponse.body[19].id).to.equal(20);
      expect(reqsponse.body[19].title).equal(
        "DANVOUY Womens T Shirt Casual Cotton Short"
      );
    });
  });

  it("Parsing Complex JSON Response", () => {
    
    let totalPrice = 0;
    cy.request({
      method: "GET",
      url: "http://fakestoreapi.com/products",
      qs: {
        limit: 5,
      },
    }).then((reqsponse) => {
      expect(reqsponse.status).to.equal(200);

      reqsponse.body.forEach(element => {
        totalPrice = totalPrice+element.price
      });

      expect(totalPrice).equal(899.23)
     
    });
  });
});
