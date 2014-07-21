class Question < ActiveRecord::Base
  belongs_to :quiz
  def self.inheritance_column
    nil
  end

 def question_type
   attr_reader :type
 end

 def question_type=(type)
   attr_writer :type, type
 end
end
