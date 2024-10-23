import './Styles/admin.css'

function Admin(){

    return (
      <div className="admin_container">
          <h1 className="admin_title">Add an Event</h1>
          <form>
            <label className="admin_label" for="eventName">Event Name:</label>
            <input className="admin_input" type="text" id="eventName" name="eventName" required></input>

            <label className="admin_label" for="eventDate">Event Date:</label>
            <input className="admin_input" type="date" id="eventDate" name="eventDate" required></input>

            <label className="admin_label" for="eventTime">Event Time:</label>
            <input className="admin_input" type="time" id="eventTime" name="eventTime" required></input>

            <label className="admin_label" for="eventDescription">Event Description:</label>
            <textarea className="admin_input" id="eventDescription" name="eventDescription" rows="4" required></textarea>

            <label className="admin_label" for="registrationLink">Registration Link:</label>
            <input className="admin_input" type="url" id="registrationLink" name="registrationLink"></input>

            <button className="admin_button" type="submit">Add Event</button>
        </form>
      </div>
    );
}

export default Admin;