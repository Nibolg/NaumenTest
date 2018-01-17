package com.NaumenTest.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.NaumenTest.model.Note;

@Repository("noteDao")
public class NoteDaoImpl extends AbstractDao<Integer, Note> implements NoteDao {

    public Note findById(int id) {
        return getByKey(id);
    }

    public void saveNote(Note note) {
        persist(note);
    }

    public void deleteNoteById(int id) {
        Query query = getSession().createSQLQuery("delete from note where id = :id");
        query.setInteger("id", id);
        query.executeUpdate();
    }

    @SuppressWarnings("unchecked")
    public List<Note> findAllNotes() {
        Criteria criteria = createEntityCriteria();
        return (List<Note>) criteria.list();
    }
}