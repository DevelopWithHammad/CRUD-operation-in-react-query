import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

async function fetchUserByEmail(email) {
  return await axios.get(`http://localhost:4000/users/${email}`);
}

async function fetchCourseByChannelId(channelId) {
  return await axios.get(`http://localhost:4000/channels/${channelId}`);
}

const DependantQuery = ({ email }) => {
  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ["user", email],
    queryFn: () => fetchUserByEmail(email)
  })

  const channelId = users?.data.channelId || "";
  console.log("channelId ====>", channelId);

  const { data: courses } = useQuery({
    queryKey: ["courses", channelId],
    queryFn: () => fetchCourseByChannelId(channelId),
    enabled: !!channelId
  })

  return (
    <div>
      {courses.map((course, index) => (
        <p>{course}</p>
      ))}
    </div>
  )
}

export default DependantQuery
