import { useCallback, useEffect, useState } from 'react'
import UserCard from '../UserCard/UserCard'
import useAuth from '../../../hooks/useAuth'
import './FollowersCard.css'

// import { followers } from '../../../data/user/followersData'

const FollowersCard = () => {
  const [followersData, setFollowersData] = useState([])
  const { user } = useAuth()
  const apiUrl = import.meta.env.VITE_API_URL

  const getFollowers = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/users/${user.id}/followers?follow_back=false`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })

      const responseData = await response.json()

      if (responseData.status == 'success') {
        setFollowersData(responseData.data.items)
      }
    } catch (e) {
      console.error(e)
    }
  }, [apiUrl, user])

  useEffect(() => {
    getFollowers()
  }, [getFollowers])

  return followersData.length > 0 && (
    <div className="followers-card">
      <h3>Who is following you</h3>

      {followersData?.map((follower, id) => (
        <UserCard key={id} data={follower} />
      ))}
    </div>
  )
}

export default FollowersCard