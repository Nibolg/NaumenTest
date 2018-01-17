package com.NaumenTest.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.NaumenTest.dao.NoteDao;
import com.NaumenTest.model.Note;

@Service("employeeService")
@Transactional
public class NoteServiceImpl implements NoteService {

    @Autowired
    private NoteDao dao;

    public Note findById(int id) {
        return dao.findById(id);
    }

    public void saveNote(Note employee) {
        dao.saveNote(employee);
    }


    public void updateNote(Note note) {
        Note entity = dao.findById(note.getId());
        if(entity!=null){
            entity.setName(note.getName());
            entity.setContent(note.getContent());
        }
    }

    public void deleteNoteById(int id) {
        dao.deleteNoteById(id);
    }

    public boolean isNoteExist(Note note) {
        return findById(note.getId())!=null;
    }

    public List<Note> findAllNotes() {
        return dao.findAllNotes();
    }
}