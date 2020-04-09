import React from 'react';
import { connect } from 'react-redux';

const Home = ({ notes = [], ws }) => {
  const [text, setText] = React.useState('');

  const handleSubmit = () => {
    const dataToSend = {
      type: 'SEND_MESSAGE',
      newNote: text,
    }
    ws.send(JSON.stringify(dataToSend));
    setText('');
  };

  return (
    <div>
      <h2>Home</h2>
      <div>
        <input values={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        {notes.map((note, i) => <div key={i}>{note}</div>)}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  notes: state.notesReducer.notes, // need this to get value of notes array from reducer
});

export default connect(mapStateToProps)(Home);
