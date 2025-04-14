


async function onGetDashs() {
    try {
      const response = await axios.get('/api/dash')
      console.log(response.data)
      if (response.status !== 200 && typeof response === typeof 'undefined') throw new Error('Failed to fetch dash data')
        
      return response.data
    } catch (error) {
      console.log(error)
    }
  }