const fs = require('fs');

async function Problem1(path, numberOfFiles, index = 1) {
  new Promise((resolve, rejects) => {
    fs.writeFile(
      `${path}random${index}.txt`,
      `created random${index}`,
      (error) => {
        if (error) {
          rejects();
        } else {
          setTimeout(() => {
            console.log(`the file random${index}.txt is created`);
            resolve();
          }, 1000);
        }
      }
    );
  })
    .then(() => {
      return new Promise((resolve, rejects) => {
        fs.unlink(`${path}random${index}.txt`, (error) => {
          if (error) {
            rejects();
          } else {
            setTimeout(() => {
              console.log(`the file random${index}.txt is deleted`);
              resolve();
            }, 1000);
          }
        });
      });
    })
    .then(() => {
      if (index < numberOfFiles) {
        Problem1(
          '/home/abhishek/Mountblue/filesSystemasyn/',
          numberOfFiles,
          ++index
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
Problem1('/home/abhishek/Mountblue/filesSystemasyn/', 10);
