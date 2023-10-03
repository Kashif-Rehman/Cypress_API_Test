describe("API Testing", () => {
  let authToken = null;
  before("Creating Access Token", () => {
    cy.request({
      method: "POST",
      url: "http://simple-books-api.glitch.me/api-clients/",
      headers: { "Content-type": "application/json" },
      body: {
        clientName: "XYZ",
        clientEmail: Math.random().toString(36).substring(2) + "@gmail.com",
      },
    }).then((respose) => {
      authToken = respose.body.accessToken;
    });
  });

  before("Creating new order", () => {
    cy.request({
      method: "POST",
      url: "http://simple-books-api.glitch.me/orders/",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + authToken,
      },

      body: {
        bookId: 1,
        customerName: "xyz",
      },
    }).then((res) => {
      expect(res.status).to.equal(201);
      expect(res.body.created).to.equal(true);
    });
  });



  it("Taking All order", ()=>{

    cy.request({
      method: "GET",
      url: "http://simple-books-api.glitch.me/orders/",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + authToken,
      },
      cookies: {
        cookieName: "myCookie",
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      assert.equal(res.status,200)
      expect(res.body).has.length(1)


      
    });

  })
});


