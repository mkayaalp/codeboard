var env = process.env.NODE_ENV = process.env.NODE_ENV || 'test';

var app = require('../../server.js'),
  request = require('supertest'),
  express = require('express'),
  should = require('should'),
  bodyParser = require('body-parser'),
  expect = require('chai').expect;

app.use(bodyParser.json());

var cookie,cookie2,cookie3;
var req = request(app);
var payload;
var id, id2, id3;
var endDate = new Date();
var startDate = new Date();

startDate.setFullYear(startDate.getFullYear() - 1);

describe('Test Server: Logs', function() {
  this.timeout(10000);
  before(function() {
    return req
      .post('/api/session')
      .send({username: 'hce', password: '1234'})
      .expect('Content-Type', /json/ )
      .expect(200)
      .then(function(reply) {
        cookie = reply.headers['set-cookie'].pop().split(';')[0];
        return req
          .post('/api/session')
          .send({username: 'martin', password: '1234'})
          .expect('Content-Type', /json/ )
          .expect(200);
      })
      .then(function(reply) {
        cookie2 = reply.headers['set-cookie'].pop().split(';')[0];
        return req
          .post('/api/session')
          .send({username: 'other', password: '1234'})
          .expect('Content-Type', /json/ )
          .expect(200);
      })
      .then(function(reply) {
        cookie3 = reply.headers['set-cookie'].pop().split(';')[0];
        return req
          .get('/api/projects/19')
          .set('cookie', cookie2)
          .expect('Content-Type', /json/)
      })
      .then(function(reply) {
        if(reply.status != 200) {
          console.log(reply);
          throw new Error(reply.text);
        }
        return req
          .get('/api/projects/19')
          .set('cookie', cookie3)
          .expect('Content-Type', /json/)
      })
      .then(function(reply) {
        if(reply.status != 200) {
          console.log(reply);
          throw new Error(reply.text);
        }
        payload = {
          action: 'compile',
          language: reply.body.language,
          files: [],
          hasLtiData: false,
        };
        reply.body.fileSet.map(function(file) {
          if (!file.isFolder)
            payload.files.push({
              content: file.content,
              filename: file.path + '/' + file.filename,
            });
        });
        payload.files.push({
          content: JSON.stringify({
            MainFileForCompilation: 'Application.java',
            MainClassForRunning: 'Application'
          }),
          filename: 'Root/codeboard.json',
        });
        return req
          .post('/api/projects/19')
          .set('cookie', cookie)
          .send(payload)
          .expect('Content-Type', /json/)
      })
      .then(function(reply) {
        if(reply.status != 200) {
          console.log(reply);
          throw new Error(reply.text);
        }
        id = reply.body.id;
        return req
          .post('/api/projects/19')
          .set('cookie', cookie2)
          .send(payload)
          .expect('Content-Type', /json/)
      })
      .then(function(reply) {
        if(reply.status != 200) {
          console.log(reply);
          throw new Error(reply.text);
        }
        id2 = reply.body.id;
        return req
          .post('/api/projects/19')
          .set('cookie', cookie3)
          .send(payload)
          .expect('Content-Type', /json/)
      })
      .then(function(reply) {
        if(reply.status != 200) {
          console.log(reply);
          throw new Error(reply.text);
        }
        id3 = reply.body.id;
        payload.action = 'run';
        payload.id = id;
        return req
          .post('/api/projects/19')
          .set('cookie', cookie)
          .send(payload)
          .expect('Content-Type', /json/)
      })
      .then(function(reply) {
        if(reply.status != 200) {
          console.log(reply);
          throw new Error(reply.text);
        }
        payload.id = id2;
        return req
          .post('/api/projects/19')
          .set('cookie', cookie2)
          .send(payload)
          .expect('Content-Type', /json/)
      })
      .then(function(reply) {
        if(reply.status != 200) {
          console.log(reply);
          throw new Error(reply.text);
        }
        payload.id = id3;
        return req
          .post('/api/projects/19')
          .set('cookie', cookie3)
          .send(payload)
          .expect('Content-Type', /json/)
      })
      .then(function(reply) {
        if(reply.status != 200) {
          console.log(reply);
          throw new Error(reply.text);
        }
        payload.action = 'compile';
        payload.id = id;
        return req
          .post('/api/projects/19/submissions')
          .set('cookie', cookie)
          .send(payload)
          .expect('Content-Type', /json/)
      })
      .then(function(reply) {
        if(reply.status != 200) {
          console.log(reply);
          throw new Error(reply.text);
        }
        payload.id = id2;
        return req
          .post('/api/projects/19/submissions')
          .set('cookie', cookie2)
          .send(payload)
          .expect('Content-Type', /json/)
      })
      .then(function(reply) {
        if(reply.status != 200) {
          console.log(reply);
          throw new Error(reply.text);
        }
        payload.id = id3;
        return req
          .post('/api/projects/19/submissions')
          .set('cookie', cookie3)
          .send(payload)
          .expect('Content-Type', /json/)
      })
      .then(function(reply) {
        if(reply.status != 200) {
          console.log(reply);
          throw new Error(reply.text);
        }
        return null;
      });
  });



  it('Logs: Compilation and running summary per day for all projects', function(done) {
    req
      .get('/api/log/summaryDay')
      .query({startDateLogs: startDate})
      .query({endDateLogs: endDate})
      .set('cookie', cookie)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(error, reply) {
        if(error) return done(error);
        //console.log(reply.body.compilerLogs[0]);
        reply.body.compilerLogs[0]._id.should.not.equal(undefined);
        reply.body.compilerLogs[0]._id.year.should.not.equal(undefined);
        reply.body.compilerLogs[0]._id.month.should.not.equal(undefined);
        reply.body.compilerLogs[0]._id.day.should.not.equal(undefined);
        reply.body.compilerLogs[0].totalTime.should.not.equal(undefined);
        reply.body.compilerLogs[0].averageTime.should.not.equal(undefined);
        reply.body.compilerLogs[0].min.should.not.equal(undefined);
        reply.body.compilerLogs[0].max.should.not.equal(undefined);
        reply.body.compilerLogs[0].count.should.not.equal(undefined);
        //expect(reply.body.compilerLogs).to.have.length.above(10);

        reply.body.compilerRunLogs[0]._id.should.not.equal(undefined);
        reply.body.compilerRunLogs[0]._id.year.should.not.equal(undefined);
        reply.body.compilerRunLogs[0]._id.month.should.not.equal(undefined);
        reply.body.compilerRunLogs[0]._id.day.should.not.equal(undefined);
        reply.body.compilerRunLogs[0].totalTime.should.not.equal(undefined);
        reply.body.compilerRunLogs[0].averageTime.should.not.equal(undefined);
        reply.body.compilerRunLogs[0].min.should.not.equal(undefined);
        reply.body.compilerRunLogs[0].max.should.not.equal(undefined);
        reply.body.compilerRunLogs[0].count.should.not.equal(undefined);
        //expect(reply.body.compilerRunLogs).to.have.length.above(10);
        done()
      });
  });


  it('Logs: Compilation and running summary per hour for all projects', function(done) {
    req
      .get('/api/log/summaryHour')
      .set('cookie', cookie)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(error, reply) {
        if(error) return done(error);
        //console.log(reply);
        reply.body.compilerLogs[0]._id.should.not.equal(undefined);
        reply.body.compilerLogs[0]._id.year.should.not.equal(undefined);
        reply.body.compilerLogs[0]._id.month.should.not.equal(undefined);
        reply.body.compilerLogs[0]._id.day.should.not.equal(undefined);
        reply.body.compilerLogs[0]._id.hour.should.not.equal(undefined);
        reply.body.compilerLogs[0].totalTime.should.not.equal(undefined);
        reply.body.compilerLogs[0].averageTime.should.not.equal(undefined);
        reply.body.compilerLogs[0].min.should.not.equal(undefined);
        reply.body.compilerLogs[0].max.should.not.equal(undefined);
        reply.body.compilerLogs[0].count.should.not.equal(undefined);
        //expect(reply.body.compilerLogs).to.have.length.above(10);

        reply.body.compilerRunLogs[0]._id.should.not.equal(undefined);
        reply.body.compilerRunLogs[0]._id.year.should.not.equal(undefined);
        reply.body.compilerRunLogs[0]._id.month.should.not.equal(undefined);
        reply.body.compilerRunLogs[0]._id.day.should.not.equal(undefined);
        reply.body.compilerRunLogs[0]._id.hour.should.not.equal(undefined);
        reply.body.compilerRunLogs[0].totalTime.should.not.equal(undefined);
        reply.body.compilerRunLogs[0].averageTime.should.not.equal(undefined);
        reply.body.compilerRunLogs[0].min.should.not.equal(undefined);
        reply.body.compilerRunLogs[0].max.should.not.equal(undefined);
        reply.body.compilerRunLogs[0].count.should.not.equal(undefined);
        //expect(reply.body.compilerRunLogs).to.have.length.above(10);

        done()
      });
  });

  it('Logs: project access summary for all projects', function(done) {
    req
      .get('/api/log/user/summaryProjectAccess')
      .set('cookie', cookie)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(error, reply) {
        if(error) return done(error);
        reply.body.projectAccess[0]._id.should.not.equal(undefined);
        reply.body.projectAccess[0].lastDate.should.not.equal(undefined);
        reply.body.projectAccess[0].lastProject.should.not.equal(undefined);
        reply.body.projectAccess[0].countProjectAccess.should.not.equal(undefined);
        expect(reply.body.projectAccess).to.have.length.above(3);
        done()
      });
  });

  it('Logs: project access per project', function(done) {
    req
      .get('/api/log/user/summaryProjectAccess/1')
      .query({startDateLogs: startDate})
      .query({endDateLogs: endDate})
      .set('cookie', cookie)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(error, reply) {
        if(error) return done(error);
        reply.body.projectAccess[0]._id.should.not.equal(undefined);
        reply.body.projectAccess[0].lastDate.should.not.equal(undefined);
        reply.body.projectAccess[0].lastProject.should.not.equal(undefined);
        reply.body.projectAccess[0].countProjectAccess.should.not.equal(undefined);
        expect(reply.body.projectAccess).to.have.length.above(1);
        done()
      });
  });

  it('Logs: summary of compilation and running per user', function(done) {
    req
      .get('/api/log/user/summaryCompiler')
      .set('cookie', cookie)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(error, reply) {
        if(error) return done(error);
        reply.body.compilerLogs[0]._id.should.not.equal(undefined);
        reply.body.compilerLogs[0].lastDate.should.not.equal(undefined);
        reply.body.compilerLogs[0].lastProject.should.not.equal(undefined);
        reply.body.compilerLogs[0].countProjectAccess.should.not.equal(undefined);
        expect(reply.body.compilerLogs).to.have.length.above(2);

        reply.body.compilerRunLogs[0]._id.should.not.equal(undefined);
        reply.body.compilerRunLogs[0].lastDate.should.not.equal(undefined);
        reply.body.compilerRunLogs[0].lastProject.should.not.equal(undefined);
        reply.body.compilerRunLogs[0].countProjectAccess.should.not.equal(undefined);
        expect(reply.body.compilerRunLogs).to.have.length.above(2);
        done()
      });
  });

  it('Logs: summary of compilation and running per user per project', function(done) {
    req
      .get('/api/log/user/summaryCompiler/1')
      .query({startDateLogs: startDate})
      .query({endDateLogs: endDate})
      .set('cookie', cookie)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(error, reply) {
        if(error) return done(error);
        //console.log(reply.body.compilerLogs);
        //console.log(reply.body.compilerRunLogs);
        reply.body.compilerLogs[0]._id.should.not.equal(undefined);
        reply.body.compilerLogs[0].lastDate.should.not.equal(undefined);
        reply.body.compilerLogs[0].lastProject.should.not.equal(undefined);
        reply.body.compilerLogs[0].countProjectAccess.should.not.equal(undefined);
        expect(reply.body.compilerLogs).to.have.length.above(1);

        reply.body.compilerRunLogs[0]._id.should.not.equal(undefined);
        reply.body.compilerRunLogs[0].lastDate.should.not.equal(undefined);
        reply.body.compilerRunLogs[0].lastProject.should.not.equal(undefined);
        reply.body.compilerRunLogs[0].countProjectAccess.should.not.equal(undefined);
        expect(reply.body.compilerRunLogs).to.have.length.above(1);
        done()
      });
  });

  it('Logs: summary of submissions per user for all projects', function(done) {
    req
      .get('/api/log/user/summarySubmitAccess')
      .set('cookie', cookie)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(error, reply) {
        if(error) return done(error);
        //console.log(reply.body.submitLogs);
        //console.log(reply.body.compilerRunLogs);
        reply.body.submitLogs[0]._id.should.not.equal(undefined);
        reply.body.submitLogs[0].lastDate.should.not.equal(undefined);
        reply.body.submitLogs[0].lastProject.should.not.equal(undefined);
        reply.body.submitLogs[0].countProjectAccess.should.not.equal(undefined);
        expect(reply.body.submitLogs).to.have.length.above(2);

        done()
      });
  });

  it('Logs: summary of submissions per user for a particular project', function(done) {
    req
      .get('/api/log/user/summarySubmitAccess/19')
      .query({startDateLogs: startDate})
      .query({endDateLogs: endDate})
      .set('cookie', cookie2)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(error, reply) {
        if(error) return done(error);
        //console.log(reply.body.submitLogs);
        reply.body.submitLogs[0]._id.should.not.equal(undefined);
        reply.body.submitLogs[0].lastDate.should.not.equal(undefined);
        reply.body.submitLogs[0].lastProject.should.not.equal(undefined);
        reply.body.submitLogs[0].countProjectAccess.should.not.equal(undefined);
        expect(reply.body.submitLogs).to.have.length.above(0);

        done()
      });
  });

  it('Logs: raw data for the compilation, running and page view logs', function(done) {
    // NOTE: this is a SuperUser test

    req
      .get('/api/logLimit/15') // 15 is the number of records
      .set('cookie', cookie)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(error, reply) {
        if(error) return done(error);
        reply.body.compilerLogs[0].id.should.not.equal(undefined);
        reply.body.compilerLogs[0].projectId.should.not.equal(undefined);
        reply.body.compilerLogs[0].startTime.should.not.equal(undefined);
        reply.body.compilerLogs[0].endTime.should.not.equal(undefined);
        reply.body.compilerLogs[0].time.should.not.equal(undefined);
        reply.body.compilerLogs[0].userName.should.not.equal(undefined);
        reply.body.compilerLogs[0].language.should.not.equal(undefined);
        reply.body.compilerLogs[0].action.should.not.equal(undefined);
        expect(reply.body.compilerLogs).to.have.length.above(0);

        reply.body.pageLogs[0].projectId.should.not.equal(undefined);
        reply.body.pageLogs[0].pageCode.should.not.equal(undefined);
        reply.body.pageLogs[0].date.should.not.equal(undefined);
        reply.body.pageLogs[0].userName.should.not.equal(undefined);
        done()
      });
  });


  it('Logs: fail to access summary of compilation per day', function(done) {
    // NOTE: this is a SuperUser test

    req
      .get('/api/log/summaryDay')
      .set('cookie', cookie3)
      .expect(401)
      .end(function(error, reply) {
        if(error) return done(error);
        done()
      });
  });

  it('Logs: fail to access summary of compilation per hour', function(done) {
    // NOTE: this is a SuperUser test

    req
      .get('/api/log/summaryHour')
      .set('cookie', cookie3)
      .expect(401)
      .end(function(error, reply) {
        if(error) return done(error);
        done()
      });
  });

  it('Logs: fail to access summary of project access for all projects', function(done) {

    // NOTE: this is a SuperUser test

    req
      .get('/api/log/user/summaryProjectAccess')
      .set('cookie', cookie3)
      .expect(401)
      .end(function(error, reply) {
        if(error) return done(error);
        done()
      });
  });

  it('Logs: fail to access summary of project access for one project', function(done) {
    req
      .get('/api/log/user/summaryProjectAccess/5')
      .set('cookie', cookie3)
      .expect(401)
      .end(function(error, reply) {
        if(error) return done(error);
        done()
      });
  });

  it('Logs: fail to access summary of compilation for all projects', function(done) {
    req
      .get('/api/log/user/summaryCompiler')
      .set('cookie', cookie3)
      .expect(401)
      .end(function(error, reply) {
        if(error) return done(error);
        done()
      });
  });

  it('Logs: fail to access summary of compilation for one project', function(done) {
    req
      .get('/api/log/user/summaryCompiler/5')
      .set('cookie', cookie3)
      .expect(401)
      .end(function(error, reply) {
        if(error) return done(error);
        done()
      });
  });

  it('Logs: fail to access summary of submissions for all projects', function(done) {
    req
      .get('/api/log/user/summarySubmitAccess')
      .set('cookie', cookie3)
      .expect(401)
      .end(function(error, reply) {
        if(error) return done(error);
        done()
      });
  });

  it('Logs: fail to access summary of submissions for all projects', function(done) {
    req
      .get('/api/log/user/summarySubmitAccess/5')
      .set('cookie', cookie3)
      .expect(401)
      .end(function(error, reply) {
        if(error) return done(error);
        done()
      });
  });

  it('Logs: fail to access raw logs', function(done) {
    req
      .get('/api/logLimit/15')
      .set('cookie', cookie3)
      .expect(401)
      .end(function(error, reply) {
        if(error) return done(error);
        done()
      });
  });

});
