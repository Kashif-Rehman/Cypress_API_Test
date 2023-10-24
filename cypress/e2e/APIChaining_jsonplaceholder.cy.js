/// <reference types= "cypress" />

describe("API Chaining", () => {
  it("Getting All Posts", () => {
    cy.request({
      method: "GET",
      url: "http://jsonplaceholder.typicode.com/posts",
    })
      .then((res) => {
        expect(res.status).equal(200);
        const postId = res.body[0].userId;
        return postId;
      })
      .then((postId) => {
        cy.request({
          method: "GET",
          url: `http://jsonplaceholder.typicode.com/comments?postId=${postId}`,
        }).then((res) => {
          expect(res.status).equal(200);
          expect(res.body).to.have.length(5);
          cy.log(res.body.length)
        });
      });
  });
});
