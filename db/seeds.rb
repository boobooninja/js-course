# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

quiz1 = Quiz.create({ title: 'Quiz 1' })
quiz2 = Quiz.create({ title: 'Quiz 2' })

question_1_1 = Question.create({
  question: 'Is this a good quiz?',
  answer: 'true',
  quiz_id: quiz1.id,
  type: 'boolean'
  })

question_1_2 = Question.create({
  question: 'Are you sure?',
  answer: 'false',
  quiz_id: quiz1.id,
  type: 'boolean'
  })

question_2_1 = Question.create({
  question: 'What is your favorite color?',
  answer: 'blue',
  quiz_id: quiz2.id,
  type: 'multiple',
  choices: 'red;green;blue;orange'
  })

question_2_2 = Question.create({
  question: 'What is your favorite food?',
  answer: 'pizza',
  quiz_id: quiz2.id,
  type: 'multiple',
  choices: 'pizza;apples;tacos;spinach'
  })
