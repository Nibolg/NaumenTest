package com.NaumenTest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.NaumenTest.model.Note;
import com.NaumenTest.service.NoteService;

@RestController
public class AppRestController {

    @Autowired
    NoteService noteService;  //Service which will do all data retrieval/manipulation work


    //-------------------Retrieve All Notes--------------------------------------------------------

    @RequestMapping(value = "/Note/", method = RequestMethod.GET)
    public ResponseEntity<List<Note>> listAllNotes() {
        List<Note> Notes = noteService.findAllNotes();
        if(Notes.isEmpty()){
            return new ResponseEntity<List<Note>>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<List<Note>>(Notes, HttpStatus.OK);
    }



    //-------------------Retrieve Single Note--------------------------------------------------------

    @RequestMapping(value = "/Note/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Note> getNote(@PathVariable("id") int id) {
        System.out.println("Fetching Note with id " + id);
        Note Note = noteService.findById(id);
        if (Note == null) {
            System.out.println("Note with id " + id + " not found");
            return new ResponseEntity<Note>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Note>(Note, HttpStatus.OK);
    }



    //-------------------Create a Note--------------------------------------------------------

    @RequestMapping(value = "/Note/", method = RequestMethod.POST)
    public ResponseEntity<Note> createNote(@RequestBody Note Note,    UriComponentsBuilder ucBuilder) {
        System.out.println("Creating Note " + Note.getName());

        if (noteService.isNoteExist(Note)) {
            System.out.println("A Note with id " + Note.getName() + " already exist");
            return new ResponseEntity<Note>(HttpStatus.CONFLICT);
        }

        noteService.saveNote(Note);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/Note/{id}").buildAndExpand(Note.getId()).toUri());
        return new ResponseEntity<Note>(Note, HttpStatus.OK);
    }



    //------------------- Update a Note --------------------------------------------------------

    @RequestMapping(value = "/Note/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Note> updateNote(@PathVariable("id") int id, @RequestBody Note Note) {
        System.out.println("Updating Note " + id);

        Note currentNote = noteService.findById(id);

        if (currentNote==null) {
            System.out.println("Note with id " + id + " not found");
            return new ResponseEntity<Note>(HttpStatus.NOT_FOUND);
        }

        currentNote.setName(Note.getName());
        currentNote.setContent(Note.getContent());


        noteService.updateNote(currentNote);
        return new ResponseEntity<Note>(currentNote, HttpStatus.OK);
    }



    //------------------- Delete a Note --------------------------------------------------------

    @RequestMapping(value = "/Note/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Note> deleteNote(@PathVariable("id") int id) {
        System.out.println("Fetching & Deleting Note with id " + id);

        Note Note = noteService.findById(id);
        if (Note == null) {
            System.out.println("Unable to delete. Note with id " + id + " not found");
            return new ResponseEntity<Note>(HttpStatus.NOT_FOUND);
        }

        noteService.deleteNoteById(id);
        return new ResponseEntity<Note>(Note,HttpStatus.OK);
    }

}
