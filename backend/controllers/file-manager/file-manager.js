const File = require('../../models/file-manager');
const Joi = require('joi');
const fs = require('fs');

const config = require('../../config/config');

const create = async (req, res) => {
  // const { error } = validate(req.body);
  // if ( error ) {
    // res.status(400).send(error.details[0].message)
  // } else {
        const body = req.body;
        const file = req.file;
        let nfile = {
          file_name: file.filename,
          title: body.title,
          type: file.mimetype,
          date: new Date()
        };
        let newFile = new File(nfile);
        try {
          await newFile.save();

          res.send({
            ok: true,
            message: 'File upload created'
          })
        } catch (error) {
          console.log(error);
          res.send({
            ok: false,
            message: 'Error in upload'
          })
        }
  // }
  }

  const getFiles = async function (req, res) {
      try {
        let files = await File.find();
        if (files.length > 0) {
          const images = [];
          const musics = [];
          const videos = [];
            for (let i=0; i< files.length; i++) {
              const time = files[i].date;
              const year = time.getFullYear();
              const month = time.getMonth() +1;
              const date = time.getDate();

              if (files[i].type == 'image/png' || files[i].type == 'image/jpg' || files[i].type == 'image/jpeg') {
                  files[i].file_name = config.URL + '/files/' + year + '/' + month + '/' + date + '/images/' + files[i].file_name;
                  images.push(files[i]);
               }
              if (files[i].type == 'audio/mpeg' || files[i].type == 'audio/wave' || files[i].type == 'audio/mp3') {
                files[i].file_name = config.URL + '/files/' + year + '/' + month + '/' + date + '/music/' + files[i].file_name;
                musics.push(files[i]);
              }
              if (files[i].type == 'video/mp4' || files[i].type == 'video/x-matroska' || files[i].type == 'video/webm') {
                files[i].file_name = config.URL + '/files/' + year + '/' + month + '/' + date + '/videos/' + files[i].file_name;
                videos.push(files[i]);
              }
            }
            res.status(200).json({
              ok: true,
              images,
              musics,
              videos
            });
        } else {
            res.send({
              ok: false,
              message: 'Files not found'
            })
        }
      } catch (error) {
          console.log(error);
          res.send({
            ok: false,
            message: 'Error in get Files'
          })
      }
  }

  const getOneFile = async function (req, res) {
    let id = req.params.id;
    try {
      let file = await File.findById(id);
      res.status(200).json(file);
    } catch (error) {
        console.log(error);
         res.send({
           ok: false,
           message: 'Error in get One File'
         })
    }
  }

  const update = async function (req, res) {
    let id = req.params.id;
    try {
      const body = req.body;
      console.log(body);
       await File.findByIdAndUpdate(id, {$set: body}, {new: true});
        res.send({
          ok: true,
          message: 'Title Updated'
        });
    } catch (error) {
        console.log(error);
          res.send({
            ok: false,
            message: 'Error in find File'
          });
    }
  }

  const deleteFile = async function (req, res) {
    let id = req.params.id;
    try {
      let  file = await File.findById(id);
      const time = file.date;
      const year = time.getFullYear();
      const month = time.getMonth() +1;
      const date = time.getDate();

      if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
            fs.unlink('backend/files/' + year + '/' + month + '/' + date + '/images/' + file.file_name, function (err) {
              if (err) {
              console.log(err.message);}
              else {
                  console.log('Image deleted!');
              }
      });
      }
      if (file.type == 'audio/mpeg' || file.type == 'audio/wave' || file.type == 'audio/mp3') {
        fs.unlink('backend/files/' + year + '/' + month + '/' + date + '/music/' + file.file_name, function (err) {
              if (err) {
              console.log(err.message);}
              else {
                  console.log('Music deleted!');
              }
      });
      }

      if (file.type == 'video/mp4' || file.type == 'video/x-matroska' || file.type == 'video/webm') {
        fs.unlink('backend/files/' + year + '/' + month + '/' + date + '/videos/' + file.file_name, function (err) {
                if (err) {
                console.log(err.message);}
                else {
                    console.log('Video deleted!');
                }
          });
      }

      await File.findByIdAndDelete(id);
      res.send({
        ok: true,
        message: "File deleted"
      });
    } catch (error) {
        console.log(error);
         res.send({
           ok: false,
           message: 'Error in delete File'
         })
    }
  }

  function validate(date) {
    const Schema = {
        name: Joi.string().required().min(3)
    }
    return Joi.validate(date, Schema);
    }



  module.exports = {
      create,
      getFiles,
      getOneFile,
      update,
      deleteFile
  }
