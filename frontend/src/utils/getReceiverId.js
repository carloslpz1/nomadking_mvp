const getRecieverId = (user_id, user1_id, user2_id) => {
  if (user_id === user1_id) {
    return user2_id
  } else {
    return user1_id
  }
}

export default getRecieverId