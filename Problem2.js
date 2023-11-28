const fs = require('fs');

function Problem2() {
  readlipsum()
    .then((data) => {
      return uppercase(data);
    })
    .then(() => {
      return filesName();
    })
    .then(() => {
      return filesystem();
    })
    .then((data) => {
      return flwrite(data);
    })
    .then(() => {
      return readllFiles();
    })
    .then((data) => {
      return filewrite(data);
    })
    .then(() => {
      return fileread();
    })
    .then((data) => {
      return delet(data[0], data[1], data[2]);
    })
    .catch((error) => {
      console.log(error);
    });
}

Problem2();

function readlipsum() {
  return new Promise((resolve, rejects) => {
    fs.readFile(
      '/home/abhishek/fileSystem/lipsum.txt',
      'utf-8',
      (error, data) => {
        if (error) {
          rejects();
        } else {
          resolve(data);
        }
      }
    );
  });
}

function uppercase(data) {
  return new Promise((resolve, rejects) => {
    //  console.log(data);
    fs.writeFile(
      '/home/abhishek/Mountblue/filesSystemasyn/filesystem1.txt',
      data.toUpperCase(),
      (error) => {
        if (error) {
          rejects(error);
        } else {
          console.log(
            ` created file filesystem1.txt and converted lipsum.txt data to uppercase`
          );

          resolve();
        }
      }
    );
  });
}

function filesName() {
  return new Promise((resolve, rejects) => {
    fs.writeFile('fileNames.txt', 'filesystem1.txt\n', (error) => {
      if (error) {
        rejects(error);
      } else {
        console.log(
          'filesystem1.txt inserted  name in fileNames.txt\n'
        );

        resolve();
      }
    });
  });
}

function filesystem() {
  return new Promise((resolve, rejects) => {
    fs.readFile('./filesystem1.txt', 'utf-8', (error, data) => {
      if (error) {
        rejects(error);
      } else {
        resolve(data);
      }
    });
  });
}

function flwrite(data) {
  // console.log(data);
  return new Promise((resolve, rejects) => {
    fs.writeFile(
      './filesystem2.txt',
      data.toLowerCase().split('.').join('\n'),
      (error) => {
        if (error) {
          rejects(error);
        } else {
          console.log(
            ` created file filesystem2.txt and converted filesystem1.txt data to Lowercase`
          );
          fs.appendFile(
            './fileNames.txt',
            'filesystem2.txt\n',
            (error) => {
              if (error) {
                rejects(error);
              } else {
                console.log(
                  'filesystem2.txt inserted  name in fileNames.txt\n'
                );

                resolve();
              }
            }
          );
        }
      }
    );
  });
}

function readllFiles() {
  return new Promise((resolve, rejects) => {
    var sorted = [];
    fs.readFile(
      //starts from here
      './fileNames.txt',
      'utf-8',
      (error, data) => {
        if (error) {
          console.log(error);
        } else {
          let filesarray = data.split('\n');

          for (let index = 0; index < 2; index++) {
            fs.readFile(
              `./${filesarray[index]}`,
              'utf-8',
              (error, data) => {
                if (error) {
                  rejects(error);
                } else {
                  sorted = [...sorted, ...data.split(' ')];
                  if (index == 1) {
                    console.log(
                      ` created filefilesystem3.txt and converted filesystem2.txt data to  sorted`
                    );
                    setTimeout(() => {
                      // filewrite(sorted.sort().join('\n'));
                      resolve(sorted.sort().join('\n'));
                    }, 1000);
                  }
                }
              }
            );
          }
        }
      }
    );
  });
}

function filewrite(data) {
  return new Promise((resolve, rejects) => {
    fs.writeFile(
      './filesystem3.txt',
      data.toString('utf-8'),
      (error) => {
        if (error) {
          rejects(error);
        } else {
          fs.appendFile(
            './fileNames.txt',
            'filesystem3.txt\n',
            (error) => {
              if (error) {
                rejects(error);
              } else {
                console.log(
                  'filesystem3.txt inserted  name in fileNames.txt\n'
                );
                //fileread();
                setTimeout(() => {
                  //fileread();
                  resolve();
                }, 1000);
              }
            }
          );
        }
      }
    );
  });
}

function fileread() {
  return new Promise((resolve, rejects) => {
    fs.readFile(
      //starts from here
      './fileNames.txt',
      'utf-8',
      (error, data) => {
        if (error) {
          rejects(error);
        } else {
          let a = data.split('\n');
          let index = 0;
          setTimeout(() => {
            resolve([a[index], a, index]);
          }, 1000);
        }
      }
    );
  });
}
function delet(name, array, index) {
  return new Promise((resolve, rejects) => {
    if (name) {
      fs.unlink(`./${name}`, (error) => {
        if (error) {
          rejects(error);
        } else {
          if (index < array.length - 1) {
            console.log(`sucessfully deleted ${name}`);
            index++;
            resolve([array[index], array, index]);
          }
        }
      });
    }
  }).then((data) => {
    return delet(data[0], data[1], data[2]);
  });
}
