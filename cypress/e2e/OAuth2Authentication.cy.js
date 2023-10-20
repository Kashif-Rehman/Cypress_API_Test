describe("Auth2.0", () => {
  let access_token = null;

  it("Get OAuth 2.0 Token", () => {
    cy.request({
      method: "POST",
      url: "https://github.com/login/oauth/access_token",
      qs: {
        client_id: Cypress.env("CLIENT_ID"),
        client_secret: Cypress.env("CLIENT_SECRETS"),
        code: "74e2ca939900d58d4023",
      },
    }).then((res) => {
      expect(res.status).to.equal(200);
      cy.log("Response Body", res.body);
      const param = res.body.split("&");
      access_token = param[0].split("=")[1];

      cy.log("Access_token", access_token);
    });
  });

  it("OAuth2 Request", () => {
    
    cy.request({
      method: "GET",
      url: "https://api.github.com/user/repos",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }).then((res) => {
      expect(res.status).to.equal(200);
    });
  });
});
