describe("GO REST Api Chaining", function () {
  const main_url = "https://gorest.co.in/";
  const token = Cypress.env("TOKEN_GOREST");

  var random = Math.random().toString(36).substring(2);

  var username = "jim" + random;
  var email = username + "@gmail.com";
  var userId = "";

  it("", function () {
    cy.request({
      method: "POST",
      url: main_url + "public/v2/users",

      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        email: email,
        name: username,
        gender: "male",
        status: "Active",
      },
    }).then((res) => {
      expect(res.status).equal(201);

      userId = res.body.id;

      cy.request({
        method: "PATCH",
        url: main_url + "public/v2/users/" + userId,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          name: "Scoot Joe",
          gender: "female",
        },
      }).then((res) => {
        expect(res.status).equal(200);
        expect(res.body.name).equal("Scoot Joe");
        expect(res.body.gender).equal("female");

        cy.request({
          method: "DELETE",
          url: main_url + "public/v2/users/" + userId,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => {
          expect(res.status).equal(204);
        });
      });
    });
  });
});
