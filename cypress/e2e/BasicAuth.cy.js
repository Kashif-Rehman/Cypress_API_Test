describe("Authentication", () => {
  it("Basic Authentication", () => {
    cy.request({
      method: "GET",
      url: "https://postman-echo.com/basic-auth",
      auth: {
        user: "postman",
        pass: "password",
      },
    }).then((res) => {
      expect(res.status).equal(200);
      expect(res.body.authenticated).to.eq(true);
    });
  });

  it("Digest Authentication", () => {
    cy.request({
      method: "GET",
      url: "https://postman-echo.com/digest-auth",
      failOnStatusCode: false,

      auth: {
        username: "postman",
        password1: "password",
        method: "digest",
      },
    }).then((response) => {
      expect(response.status).to.equal(401);
      // expect(response.body.authenticated).to.eq(true);
    });
  });

  it("Bearer Token Authentication", () => {
    const baseUrl = Cypress.env("BASE_URL");
    const token = Cypress.env("TOKEN");
    cy.request({
      method: "GET",
      url: baseUrl,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      expect(res.status).to.equal(200);
    });
  });

  it("API KEY Authentication", () => {
    cy.request({
      url: "https://api.openweathermap.org/data/2.5/forecast/daily",
      qs: {
        appid: "fe9c5cddb7e01d747b4611c3fc9eaf2c",
        q:"Lahore"
      },
    }).then((res)=>{
      expect(res.status).equal(200)
    });
  });
});
