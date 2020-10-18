'use strict';

/**
 * Created by hce on 03/22/15.
 *
 * Adds template projects to the database
 * if a template for that particular language does not yet exist.
 *
 */


const db = require('../models'),
  util = require('util'),
  Promise = require('bluebird'),
  fs = Promise.promisifyAll(require('fs'));


const addTemplateForC = function() {

  return new Promise(function (resolve, reject) {
    const root = 'db_templates/C/Root/';
    db.TemplateProject
      .findOne({where: {language: 'C'}})
      .then(function(result) {
        if(result !== null) {
          resolve();
        }

        return db.TemplateProject
          .create({language: 'C'});
      })
      .then(function(templatePrj){
        return db.TemplateFile
          .create({
            filename: 'Root',
            path: '',
            uniqueId: 0,
            parentUId: -1,
            isFolder: true,
            content: '',
            isHidden: false,
            TemplateProjectId: templatePrj.id
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'main.c', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'main.c',
                path: 'Root',
                uniqueId: 1,
                parentUId: 0,
                isFolder: false,
                content: content,
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            resolve();
          });
      });
  });
};


const addTemplateForCpp = function() {

  return new Promise(function (resolve, reject) {
    const root = 'db_templates/C++/Root/';
    db.TemplateProject
      .findOne({where: {language: 'C++'}})
      .then(function(result) {
        if(result !== null) {
          resolve();
        }

        return db.TemplateProject
          .create({language: 'C++'});
      })
      .then(function(templatePrj) {
        return db.TemplateFile
          .create({
            filename: 'Root',
            path: '',
            uniqueId: 0,
            parentUId: -1,
            isFolder: true,
            content: '',
            isHidden: false,
            TemplateProjectId: templatePrj.id
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'main.cpp', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'main.cpp',
                path: 'Root',
                uniqueId: 1,
                parentUId: 0,
                isFolder: false,
                content: content,
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            resolve();
          });
      });
  });
};


const addTemplateForEiffel = function() {

  return new Promise(function (resolve, reject) {
    const root = 'db_templates/Eiffel/Root/';
    db.TemplateProject
      .findOne({where: {language: 'Eiffel'}})
      .then(function(result) {
        if(result !== null) {
          resolve();
        }

        return db.TemplateProject
          .create({language: 'Eiffel'});
      })
      .then(function(templatePrj){
        return db.TemplateFile
          .create({
            filename: 'Root',
            path: '',
            uniqueId: 0,
            parentUId: -1,
            isFolder: true,
            content: '',
            isHidden: false,
            TemplateProjectId: templatePrj.id
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'project.ecf', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'project.ecf',
                path: 'Root',
                uniqueId: 1,
                parentUId: 0,
                isFolder: false,
                content: content,
                isHidden: true,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'application.e', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'application.e',
                path: 'Root',
                uniqueId: 2,
                parentUId: 0,
                isFolder: false,
                content: content,
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          }).then(function(templateFile) {
            resolve();
          });
      });
  });
};


const addTemplateForEiffelSCOOP = function() {

  return new Promise(function (resolve, reject) {
    const root = 'db_templates/Eiffel-SCOOP/Root/';
    db.TemplateProject
      .findOne({where: {language: 'Eiffel-SCOOP'}})
      .then(function(result) {
        if(result !== null) {
          resolve();
        }

        return db.TemplateProject
          .create({language: 'Eiffel-SCOOP'});
      })
      .then(function(templatePrj) {
        return db.TemplateFile
          .create({
            filename: 'Root',
            path: '',
            uniqueId: 0,
            parentUId: -1,
            isFolder: true,
            content: '',
            isHidden: false,
            TemplateProjectId: templatePrj.id
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'project.ecf', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'project.ecf',
                path: 'Root',
                uniqueId: 1,
                parentUId: 0,
                isFolder: false,
                content: content,
                isHidden: true,
                TemplateProjectId: templatePrj.id
            });
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'application.e', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'application.e',
                path: 'Root',
                uniqueId: 2,
                parentUId: 0,
                isFolder: false,
                content: content,
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            resolve();
          });
      });
  });
};


const addTemplateForHaskell = function() {

  return new Promise(function (resolve, reject) {
    const root = 'db_templates/Haskell/Root/';
    db.TemplateProject
      .findOne({where: {language: 'Haskell'}})
      .then(function(result) {
        if(result !== null) {
          resolve();
        }

        return db.TemplateProject
          .create({language: 'Haskell'});
      })
      .then(function(templatePrj){
        return db.TemplateFile
          .create({
            filename: 'Root',
            path: '',
            uniqueId: 0,
            parentUId: -1,
            isFolder: true,
            content: '',
            isHidden: false,
            TemplateProjectId: templatePrj.id
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'codeboard.json', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'codeboard.json',
                path: 'Root',
                uniqueId: 1,
                parentUId: 0,
                isFolder: false,
                content: content,
                isHidden: true,
                TemplateProjectId: templatePrj.id
            });
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'Main.hs', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'Main.hs',
                path: 'Root',
                uniqueId: 2,
                parentUId: 0,
                isFolder: false,
                content: content,
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            resolve();
          });
      });
  });
};


const addTemplateForHaskellHSpec = function() {

  return new Promise(function (resolve, reject) {
    const root = 'db_templates/Haskell-HSpec/Root/';
    db.TemplateProject
      .findOne({where: {language: 'Haskell-HSpec'}})
      .then(function(result) {
        if(result !== null) {
          resolve();
        }

        return db.TemplateProject
          .create({language: 'Haskell-HSpec'});
      })
      .then(function(templatePrj) {
        return db.TemplateFile
          .create({
            filename: 'Root',
            path: '',
            uniqueId: 0,
            parentUId: -1,
            isFolder: true,
            content: '',
            isHidden: false,
            TemplateProjectId: templatePrj.id
          })
          .then(function(templateFile) {
            return db.TemplateFile
              .create({
                filename: 'Src',
                path: 'Root',
                uniqueId: 1,
                parentUId: 0,
                isFolder: true,
                content: '',
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return db.TemplateFile
              .create({
                filename: 'Test',
                path: 'Root',
                uniqueId: 2,
                parentUId: 0,
                isFolder: true,
                content: '',
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return db.TemplateFile
              .create({
                filename: 'TestSubmission',
                path: 'Root',
                uniqueId: 3,
                parentUId: 0,
                isFolder: true,
                content: '',
                isHidden: true,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'codeboard.json', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'codeboard.json',
                path: 'Root',
                uniqueId: 4,
                parentUId: 0,
                isFolder: false,
                content: content,
                isHidden: true,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'Src/Main.hs', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'Main.hs',
                path: 'Root/Src',
                uniqueId: 5,
                parentUId: 1,
                isFolder: false,
                content: content,
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'Src/Finder.hs', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'Finder.hs',
                path: 'Root/Src',
                uniqueId: 6,
                parentUId: 1,
                isFolder: false,
                content: content,
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'Test/FinderSpec.hs', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'FinderSpec.hs',
                path: 'Root/Test',
                uniqueId: 7,
                parentUId: 2,
                isFolder: false,
                content: content,
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'TestSubmission/SubSpec.hs', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'SubSpec.hs',
                path: 'Root/TestSubmission',
                uniqueId: 8,
                parentUId: 3,
                isFolder: false,
                content: content,
                isHidden: true,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            resolve();
          });
      });
  });
};


const addTemplateForInferJava = function() {

  return new Promise(function (resolve, reject) {
    const root = 'db_templates/Infer-Java/Root/';
    db.TemplateProject
      .findOne({where: {language: 'Infer-Java'}})
      .then(function(result) {
        if(result !== null) {
          resolve();
        }

        return db.TemplateProject
          .create({language: 'Infer-Java'});
      })
      .then(function(templatePrj){
        return db.TemplateFile
          .create({
            filename: 'Root',
            path: '',
            uniqueId: 0,
            parentUId: -1,
            isFolder: true,
            content: '',
            isHidden: false,
            TemplateProjectId: templatePrj.id
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'codeboard.json', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'codeboard.json',
                path: 'Root',
                uniqueId: 1,
                parentUId: 0,
                isFolder: false,
                content: content,
                isHidden: true,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'Hello.java', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'Hello.java',
                path: 'Root',
                uniqueId: 2,
                parentUId: 0,
                isFolder: false,
                content: content,
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            resolve();
          });
      });
  });
};


const addTemplateForReason = function() {

  return new Promise(function (resolve, reject) {
    const root = 'db_templates/Reason/Root/';
    db.TemplateProject
      .findOne({where: {language: 'Reason'}})
      .then(function(result) {
        if(result !== null) {
          resolve();
        }

        return db.TemplateProject
          .create({language: 'Reason'});
      })
      .then(function(templatePrj){
        return db.TemplateFile
          .create({
            filename: 'Root',
            path: '',
            uniqueId: 0,
            parentUId: -1,
            isFolder: true,
            content: '',
            isHidden: false,
            TemplateProjectId: templatePrj.id
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'codeboard.json', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'codeboard.json',
                path: 'Root',
                uniqueId: 1,
                parentUId: 0,
                isFolder: false,
                content: content,
                isHidden: true,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'Hello.re', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'Hello.re',
                path: 'Root',
                uniqueId: 2,
                parentUId: 0,
                isFolder: false,
                content: content,
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'Message.re', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'Message.re',
                path: 'Root',
                uniqueId: 3,
                parentUId: 0,
                isFolder: false,
                content: content,
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            resolve();
          });
      });
  });
};


const addTemplateForJava = function() {

  return new Promise(function (resolve, reject) {
    const root = 'db_templates/Java/Root/';
    db.TemplateProject
      .findOne({where: {language: 'Java'}})
      .then(function(result) {
        if(result !== null) {
          resolve();
        }

        return db.TemplateProject
          .create({language: 'Java'});
      })
      .then(function(templatePrj) {
        return db.TemplateFile
          .create({
            filename: 'Root',
            path: '',
            uniqueId: 0,
            parentUId: -1,
            isFolder: true,
            content: '',
            isHidden: false,
            TemplateProjectId: templatePrj.id
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'codeboard.json', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'codeboard.json',
                path: 'Root',
                uniqueId: 1,
                parentUId: 0,
                isFolder: false,
                content: content,
                isHidden: true,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'Main.java', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'Main.java',
                path: 'Root',
                uniqueId: 2,
                parentUId: 0,
                isFolder: false,
                content: content,
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            resolve();
          });
      });
  });
};


const addTemplateForJavaJUnit = function() {

  return new Promise(function (resolve, reject) {
    const root = 'db_templates/Java-JUnit/Root/';
    db.TemplateProject
      .findOne({where: {language: 'Java-JUnit'}})
      .then(function(result) {
        if(result !== null) {
          resolve();
        }

        return db.TemplateProject
          .create({language: 'Java-JUnit'});
      })
      .then(function(templatePrj){
        return db.TemplateFile
          .create({
            filename: 'Root',
            path: '',
            uniqueId: 0,
            parentUId: -1,
            isFolder: true,
            content: '',
            isHidden: false,
            TemplateProjectId: templatePrj.id
          })
          .then(function(templateFile) {
            return db.TemplateFile
              .create({
                filename: 'src',
                path: 'Root',
                uniqueId: 1,
                parentUId: 0,
                isFolder: true,
                content: '',
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return db.TemplateFile
              .create({
                filename: 'test',
                path: 'Root',
                uniqueId: 2,
                parentUId: 0,
                isFolder: true,
                content: '',
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return db.TemplateFile
              .create({
                filename: 'test_submission',
                path: 'Root',
                uniqueId: 3,
                parentUId: 0,
                isFolder: true,
                content: '',
                isHidden: true,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'codeboard.json', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'codeboard.json',
                path: 'Root',
                uniqueId: 4,
                parentUId: 0,
                isFolder: false,
                content: content,
                isHidden: true,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'src/Main.java', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'Main.java',
                path: 'Root/src',
                uniqueId: 5,
                parentUId: 1,
                isFolder: false,
                content: content,
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'src/Finder.java', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                 filename: 'Finder.java',
                path: 'Root/src',
                uniqueId: 6,
                parentUId: 1,
                isFolder: false,
                content: content,
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'test/FinderTest.java', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'FinderTest.java',
                path: 'Root/test',
                uniqueId: 7,
                parentUId: 2,
                isFolder: false,
                content: content,
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return fs
              .readFileAsync(root + 'test_submission/SubTest.java', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'SubTest.java',
                path: 'Root/test_submission',
                uniqueId: 8,
                parentUId: 3,
                isFolder: false,
                content: content,
                isHidden: true,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            resolve();
          });
      });
  });
};


const addTemplateForPython = function() {

  return new Promise(function (resolve, reject) {
    const root = 'db_templates/Python/Root/';
    db.TemplateProject
      .findOne({where: {language: 'Python'}})
      .then(function(result) {
        if(result !== null) {
          resolve();
        }

        return db.TemplateProject
          .create({language: 'Python'});
      })
      .then(function(templatePrj) {
        return db.TemplateFile
          .create({
            filename: 'Root',
            path: '',
            uniqueId: 0,
            parentUId: -1,
            isFolder: true,
            content: '',
            isHidden: false,
            TemplateProjectId: templatePrj.id
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'codeboard.json', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'codeboard.json',
                path: 'Root',
                uniqueId: 1,
                parentUId: 0,
                isFolder: false,
                content: content,
                isHidden: true,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'main.py', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'main.py',
                path: 'Root',
                uniqueId: 2,
                parentUId: 0,
                isFolder: false,
                content: content,
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            resolve();
          });
      });
  });
};


const addTemplateForPythonUnitTest = function() {

  return new Promise(function (resolve, reject) {
    const root = 'db_templates/Python-UnitTest/Root/';
    db.TemplateProject
      .findOne({where: {language: 'Python-UnitTest'}})
      .then(function(result) {
        if(result !== null) {
          resolve();
        }

        return db.TemplateProject
          .create({language: 'Python-UnitTest'});
      })
      .then(function(templatePrj){
        return db.TemplateFile
          .create({
            filename: 'Root',
            path: '',
            uniqueId: 0,
            parentUId: -1,
            isFolder: true,
            content: '',
            isHidden: false,
            TemplateProjectId: templatePrj.id
          })
          .then(function(templateFile) {
            return db.TemplateFile
              .create({
                filename: 'src',
                path: 'Root',
                uniqueId: 1,
                parentUId: 0,
                isFolder: true,
                content: '',
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return db.TemplateFile
              .create({
                filename: 'test',
                path: 'Root',
                uniqueId: 2,
                parentUId: 0,
                isFolder: true,
                content: '',
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return db.TemplateFile
              .create({
                filename: 'testSubmission',
                 path: 'Root',
                 uniqueId: 3,
                 parentUId: 0,
                 isFolder: true,
                 content: '',
                 isHidden: true,
                 TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + '__init__.py', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: '__init__.py',
                path: 'Root',
                uniqueId: 4,
                parentUId: 0,
                isFolder: false,
                content: content,
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'codeboard.json', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'codeboard.json',
                path: 'Root',
                uniqueId: 5,
                parentUId: 0,
                isFolder: false,
                content: content,
                isHidden: true,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'src/__init__.py', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: '__init__.py',
                path: 'Root/src',
                uniqueId: 6,
                parentUId: 1,
                isFolder: false,
                content: content,
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'src/main.py', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'main.py',
                path: 'Root/src',
                uniqueId: 7,
                parentUId: 1,
                isFolder: false,
                content: content,
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'src/finder.py', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'finder.py',
                path: 'Root/src',
                uniqueId: 8,
                parentUId: 1,
                isFolder: false,
                content: content,
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'src/__init__.py', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: '__init__.py',
                path: 'Root/test',
                uniqueId: 9,
                parentUId: 2,
                isFolder: false,
                content: content,
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          }).then(function(templateFile) {
            return fs.readFileAsync(root + 'test/finderTest.py', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'finderTest.py',
                path: 'Root/test',
                uniqueId: 10,
                parentUId: 2,
                isFolder: false,
                content: content,
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return fs
              .readFileAsync(root + '/testSubmission/__init__.py', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: '__init__.py',
                path: 'Root/testSubmission',
                uniqueId: 11,
                parentUId: 3,
                isfolder: false,
                content: content,
                isHidden: true,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return fs
              .readFileAsync(root + '/testSubmission/subTest.py', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'subTest.py',
                path: 'Root/testSubmission',
                uniqueId: 12,
                parentUId: 3,
                isFolder: false,
                content: content,
                isHidden: true,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            resolve();
          });
      });
  });
};


const addTemplateForPython3 = function() {

  return new Promise(function (resolve, reject) {
    const root = 'db_templates/Python3/Root/';
    db.TemplateProject
      .findOne({where: {language: 'Python3'}})
      .then(function(result) {
        if(result !== null) {
          resolve();
        }

        return db.TemplateProject
          .create({language: 'Python3'});
      })
      .then(function(templatePrj) {
        return db.TemplateFile
          .create({
            filename: 'Root',
            path: '',
            uniqueId: 0,
            parentUId: -1,
            isFolder: true,
            content: '',
            isHidden: false,
            TemplateProjectId: templatePrj.id
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'codeboard.json', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'codeboard.json',
                path: 'Root',
                uniqueId: 1,
                parentUId: 0,
                isFolder: false,
                content: content,
                isHidden: true,
                TemplateProjectId: templatePrj.id
              });
          })
          .then(function(templateFile) {
            return fs.readFileAsync(root + 'main.py', 'utf8');
          })
          .then(function(content) {
            return db.TemplateFile
              .create({
                filename: 'main.py',
                path: 'Root',
                uniqueId: 2,
                parentUId: 0,
                isFolder: false,
                content: content,
                isHidden: false,
                TemplateProjectId: templatePrj.id
              });
            })
            .then(function(templateFile){
              resolve();
            });
        });
  });
};


/**
 * Adds all the template projects
 * @returns {Bluebird.Promise|*}
 */
const addAllTemplateProjects = function() {

  return addTemplateForC()
    .then(function() {
      return addTemplateForCpp();
    }).then(function() {
      return addTemplateForEiffel();
    }).then(function() {
      return addTemplateForHaskell();
    }).then(function() {
      return addTemplateForHaskellHSpec();
    }).then(function() {
      return addTemplateForJava();
    }).then(function() {
      return addTemplateForJavaJUnit();
    }).then(function() {
      return addTemplateForPython();
    }).then(function() {
      return addTemplateForPythonUnitTest();
    }).then(function() {
      return addTemplateForEiffelSCOOP();
    })
    .catch(function(err) {
      console.log('dbTemplateProjectsjs error.' +
                  'Please check validity of template projects.');
      console.log(err);
      return Promise.reject(err);
  });
};


module.exports = {
  addAllTemplateProjects: addAllTemplateProjects
};
