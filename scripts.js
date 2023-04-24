const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  
  const data = {
    response: {
      requestType: "FETCH_ATHLETE_DATA",
      requestBy: "ALL_MATCHING_ATHLETES",
      forDisplay: "BEST_RACES",
  
      data: {
        NM372: {
          firstName: "Nwabisa",
          surname: "Masiko",
          id: "NM372",
          races: [
            {
              date: '2022-11-18T20:00:00.000Z',
              time: [9, 7, 8, 6],
            },
            {
              date: '2022-12-02T20:00:00.000Z',
              time: [6, 7, 8, 7],
            },
          ],
        },
  
        SV782: {
          firstName: "Schalk",
          surname: "Venter",
          id: "SV782",
          races: [
            {
              date: '2022-11-18T20:00:00.000Z',
              time: [10, 8, 3, 12],
            },
            {
              date: '2022-11-25T20:00:00.000Z',
              time: [6, 8, 9, 11],
            },
            {
              date: '2022-12-02T20:00:00.000Z',
              time: [10, 11, 4, 8],
            },
            {
              date: '2022-12-09T20:00:00.000Z',
              time: [9, 8, 9, 11],
            },
          ],
        },
      },
    },
  };
  
  // Only edit below this comment
  
  const createHtml = (athlete) => {
    const firstName = athlete.firstName
    const surname = athlete.surname
    const id = athlete.id
    let races = athlete.races
    
    console.log(races)
  
    const body = document.body
    const title = document.createElement('h2');
    title.textContent = id;
    body.append(title)

    let dateAsArray = []
    let timeAsArray = []
    for(let i = 0; i < athlete.races.length; i ++) {
        let newDate = new Date(athlete.races[i].date)
        timeAsArray.push(athlete.races[i].time)
        dateAsArray.push(newDate)
    }

    let latestDate = ''

    for(let i = 0; i < dateAsArray.length; i ++) {
      if(dateAsArray[dateAsArray.length -1].getTime() < dateAsArray[i].getTime()) {
        latestDate = dateAsArray[i + 1]
      } else {
        latestDate = dateAsArray[dateAsArray.length -1]
      }
    }

    const day = latestDate.getDate()
    const month = latestDate.toLocaleString('default', { month: 'short' })
    const year = latestDate.getFullYear()
    const formattedDate = month < 10 ? `${day} 0${month} ${year}` : `${day} ${month} ${year}`

    const flatArray = timeAsArray.flat()
    const totalRaces = flatArray.length
    let total = 0;
    for(let i = 0; i < flatArray.length; i ++) {
      total += flatArray[i]
    }
    
    const totalHours = total / 60
    const hours = Math.floor(totalHours);
    const minutes = total - (hours * 60);
  
    const list = document.createElement('dl')
    document.querySelector(`[data-athlete=${id}]`).append(list)

    list.innerHTML = /* html */ `
      <dt>Athlete</dt>
      <dd>${firstName, surname}</dd>
  
      <dt>Total Races</dt>
      <dd>${totalRaces}</dd>
  
      <dt>Event Date (Latest)</dt>
      <dd>${formattedDate}</dd>
  
      <dt>Total Time (Latest)</dt>
      <dd>${hours}:${minutes}</dd>
    `;
  
    body.append(list);
  }
  createHtml(data.response.data.NM372)
  createHtml(data.response.data.SV782)