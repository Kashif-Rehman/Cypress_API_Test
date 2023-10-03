describe("API Testing", () => {
  it("Approach 1 Hard Coded JSON Object", () => {
    const requestBody = {
      tourist_name: "Mike",
      tourist_email: "hello_mike12345678@gmail.com",
      tourist_location: "USA",
    };

    cy.request({
      method: "POST",
      url: "http://restapi.adequateshop.com/api/Tourist",
      body: requestBody,
    }).then((respose) => {
      expect(respose.status).to.eq(201);
      expect(respose.body.tourist_name).to.eq("Mike");
      expect(respose.body.tourist_email).to.eq("hello_mike12345678@gmail.com");
      expect(respose.body.tourist_location).to.eq("USA");
    });
  });

  it("Approach 2 Daynamacally created JSON Object", () => {
    const requestBody = {
      tourist_name: Math.random().toString(36).substring(2),
      tourist_email: Math.random().toString(36).substring(2) + "@gmail.com",
      tourist_location: "USA",
    };

    cy.request({
      method: "POST",
      url: "http://restapi.adequateshop.com/api/Tourist",
      body: requestBody,
    }).then((respose) => {
      expect(respose.status).to.eq(201);
      expect(respose.body.tourist_name).to.eq(requestBody.tourist_name);
      expect(respose.body.tourist_email).to.eq(requestBody.tourist_email);
      expect(respose.body.tourist_location).to.eq(requestBody.tourist_location);
    });
  });

  it.only("Approach 3 Using fixtures", () => {
    cy.fixture("Tourist").then((data) => {
      const requestBody = data;

      cy.request({
        method: "POST",
        url: "http://restapi.adequateshop.com/api/Tourist",
        body: requestBody,
      }).then((respose) => {
        expect(respose.status).to.eq(201);
        expect(respose.body.tourist_name).to.eq(requestBody.tourist_name);
        expect(respose.body.tourist_email).to.eq(requestBody.tourist_email);
        expect(respose.body.tourist_location).to.eq(requestBody.tourist_location);
        expect(respose.body).has.property('tourist_email',requestBody.tourist_email);
        expect(respose.body).to.have.property('tourist_email',requestBody.tourist_email);
      });
    });
  });
});
