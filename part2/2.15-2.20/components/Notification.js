const Notification = ({ notification}) => {
    if (notification === null) {
      return (null)
    }
  
    return (
      <div className='added'>
        {notification}
      </div>
    )
  }

export default Notification