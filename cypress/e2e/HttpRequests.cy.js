describe("Http Requests", function () {
  it("Get Call", function () {
    cy.request("GET", "http://jsonplaceholder.typicode.com/posts/1")
      .its("status")
      .should("equal", 200);
  });

  it("Post Call", function () {
    cy.request({
      method: "POST",
      url: "http://jsonplaceholder.typicode.com/posts/",

      body: {
        userId: 1,
        title: "Test Post",
        body: "This bost call",
      },
    })
      .its("status")
      .should("equal", 201);
  });

  it("Put Call", function () {
    cy.request({
      method: "PUT",
      url: "http://jsonplaceholder.typicode.com/posts/1",

      body: {
        userId: 1,
        title: "Test Post",
        body: "This bost call",
        id: 1,
      },
    })
      .its("status")
      .should("equal", 200);
  });

  it("Delete Call", function () {
    cy.request("DELETE", "http://jsonplaceholder.typicode.com/posts/1").its("status")
    .should("equal", 200);
  });
});
