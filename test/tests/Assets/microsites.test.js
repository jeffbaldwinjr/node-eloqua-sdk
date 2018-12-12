let EloquaApi = common.EloquaApi;
let getOptions = common.getOptions;
let moxios = require('moxios');
let sinon = require('sinon');

/** @test {Microsites} */
describe('Microsite Tests', () => {

  /** @test {Microsites#get} */
  it('Microsite Get', done => {
    let eloqua = new EloquaApi(getOptions());
    eloqua.init().then(() => {
      eloqua.assets.microsites.get({count: 1}).then((result) => {
        expect(result).to.be.an('Object');
      });
    }).then(done);
  });

  /** @test {Microsites#get} */
  it('Microsite Get with invalid credentials', done => {
    let eloqua = new EloquaApi(getOptions({baseURL: null, password: null}));
    eloqua.init().then(() => {
      eloqua.assets.microsites.get().then((result) => {
        expect(result).to.eql('401: Unauthorized');
      });
    }).then(done);
  });

  /** @test {Microsites#getOne} */
  it('Microsite Get One', done => {
    let eloqua = new EloquaApi(getOptions());
    eloqua.init().then(() => {
      eloqua.assets.microsites.get({count: 1}).then((results) => {
        expect(results).to.be.an('Object');
        eloqua.assets.microsites.getOne(results.elements[0].id).then((result) => {
          expect(result).to.be.an('Object');
        });
      });
    }).then(done);
  });

  /** @test {Microsites#getOne} */
  it('Microsite Get One with Querystring', done => {
    let eloqua = new EloquaApi(getOptions());
    eloqua.init().then(() => {
      eloqua.assets.microsites.get({count: 1}).then((results) => {
        expect(results).to.be.an('Object');
        eloqua.assets.microsites.getOne(results.elements[0].id, {depth: 'minimal'}).then((result) => {
          expect(result).to.be.an('Object');
        });
      });
    }).then(done);
  });

  /** @test {Microsites#getOne} */
  it('Microsite Get One with invalid Id', done => {
    let eloqua = new EloquaApi(getOptions({sitename: 'test'}));
    eloqua.init().then(() => {
      eloqua.assets.microsites.getOne(1).then((result) => {
        expect(result).to.eql('401: Unauthorized');
      });
    }).then(done);
  });

  /** @test {Microsites#create} */
  it('Microsite Create', (done) => {
    let data = {
      name: 'Test'
    };
    let eloqua = new EloquaApi(getOptions({isTest: true}));
    eloqua.init().then(() => {

      moxios.install(eloqua.request);

      moxios.withMock(() => {
        let onFulfilled = sinon.spy();
        eloqua.assets.microsites.create(data).then(onFulfilled);
        moxios.wait(() => {
          let request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: data
          }).then(() => {
            expect(onFulfilled.getCall(0).args[0].data).to.eql(data);
          }).then(done);
        });
      });
    });
  });

  /** @test {Microsites#create} */
  it('Microsite Create with Error', (done) => {
    let data = {
      name: 'Test'
    };
    let eloqua = new EloquaApi(getOptions({sitename: 'test'}));
    eloqua.init().then(() => {
      eloqua.assets.microsites.create(data).then((result) => {
        expect(result).to.eql('401: Unauthorized');
      });
    }).then(done);
  });

  /** @test {Microsites#update} */
  it('Microsite Update', (done) => {
    let data = {
      name: 'Test'
    };
    let eloqua = new EloquaApi(getOptions({isTest: true}));
    eloqua.init().then(() => {

      moxios.install(eloqua.request);

      moxios.withMock(() => {
        let onFulfilled = sinon.spy();
        eloqua.assets.microsites.update(1, data).then(onFulfilled);
        moxios.wait(() => {
          let request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: data
          }).then(() => {
            expect(onFulfilled.getCall(0).args[0].data).to.eql(data);
          }).then(done);
        });
      });
    });
  });

  /** @test {Microsites#update} */
  it('Microsite Update with Error', (done) => {
    let data = {
      name: 'Test'
    };
    let eloqua = new EloquaApi(getOptions({sitename: 'test'}));
    eloqua.init().then(() => {
      eloqua.assets.microsites.update(1, data).then((result) => {
        expect(result).to.eql('401: Unauthorized');
      });
    }).then(done);
  });

  /** @test {Microsites#delete} */
  it('Microsite Delete', (done) => {
    let eloqua = new EloquaApi(getOptions({isTest: true}));
    eloqua.init().then(() => {

      moxios.install(eloqua.request);

      moxios.withMock(() => {
        let onFulfilled = sinon.spy();
        eloqua.assets.microsites.delete(1).then(onFulfilled);
        moxios.wait(() => {
          let request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: 'Deleted.'
          }).then(() => {
            expect(onFulfilled.getCall(0).args[0].data).to.eql('Deleted.');
          }).then(done);
        });
      });
    });
  });

  /** @test {Microsites#delete} */
  it('Microsite Delete with Error', (done) => {
    let eloqua = new EloquaApi(getOptions({sitename: 'test'}));
    eloqua.init().then(() => {
      eloqua.assets.microsites.delete(1).then((result) => {
        expect(result).to.eql('401: Unauthorized');
      });
    }).then(done);
  });
});
