async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`



  const reqA = await axios.get('http://localhost:3003/api/learners')
  const reqB = await axios.get('http://localhost:3003/api/mentors')

  document.querySelector('.info').textContent = 'No learner is selected'


  let learnArr = reqA.data
  let mentArr = reqB.data

  learnArr.forEach((learner) => {
    mentArr.forEach((mentor) => {
      for (let i = 0; i < learner.mentors.length; i++) {
        if (learner.mentors[i] === mentor.id) {
          learner.mentors[i] = `${mentor.firstName} ${mentor.lastName}`
        }
      }
    })
  })

  const theCards = document.querySelector('.cards')
  function getLearnerCard(learner) {
    const learnerCard = document.createElement('div')
    learnerCard.classList.add('card')
    const NameTag = document.createElement('h3')
    const Email = document.createElement('div')
    const MentList = document.createElement('h4')
    MentList.classList.add('closed')
    const MentNames = document.createElement('ul')


    learner.mentors.forEach((person) => {
      let individual = document.createElement('li')
      individual.textContent = person
      MentNames.appendChild(individual)
    })


    NameTag.textContent = learner.fullName
    Email.textContent = learner.email
    MentList.textContent = 'Mentors'



    const handleClick = () => {
      const AmazonPrimeMember = document.querySelector('.selected')
      if (AmazonPrimeMember) {
        document.querySelector('.selected h3').textContent = document.querySelector('.selected h3').textContent.split(',')[0]
        document.querySelector('.selected').classList.remove('selected')
        document.querySelector('.info').textContent = 'No learner is selected'
      } 
      if (AmazonPrimeMember !== learnerCard) {
        learnerCard.classList.add('selected')
        learnerCard.querySelector('.selected h3').textContent = `${learner.fullName}, ID ${learner.id}`
        document.querySelector('.info').textContent = `The selected learner is ${learner.fullName}`
      }

    }



    const handleClick2 = (event) => {
      if (document.querySelector('.selected') === learnerCard) {
        event.stopPropagation()
      }
      event.target.classList.toggle('closed')
      event.target.classList.toggle('open')
    }




    learnerCard.addEventListener('click', handleClick)
    MentList.addEventListener('click', handleClick2)


    learnerCard.appendChild(NameTag)
    learnerCard.appendChild(Email)
    learnerCard.appendChild(MentList)
    learnerCard.appendChild(MentNames)

    theCards.appendChild(learnerCard)
  }
  learnArr.forEach((person) => {
    getLearnerCard(person)
  })









  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
