import React, { useState } from 'react';
import { EditAlt } from '@styled-icons/boxicons-regular';
import { TrashAlt } from '@styled-icons/boxicons-regular';
import { Check, X } from '@styled-icons/heroicons-solid';

const QuestionBlockEdit = ({ isMultipleChoice=true }) => {

  const question = "What is your favorite color?" 
  const options = ['Red', 'Green', 'Blue']

  const [questionText, setQuestionText] = useState(question);
  const [optionTexts, setOptionTexts] = useState(options);
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const [isEditingOption, setIsEditingOption] = useState(new Array(optionTexts.length).fill(false));

  const handleQuestionChange = (e) => {
    setQuestionText(e.target.value);
  };

  const handleOptionChange = (e, index) => {

    const newOptionTexts = [...optionTexts];
    newOptionTexts[index] = e.target.value;
    setOptionTexts(newOptionTexts);
  };

  const handleAddOption = () => {
    setOptionTexts([...optionTexts, '']);
    setIsEditingOption([...isEditingOption, true]);
  };

  const handleRemoveOption = (index) => {
    const newOptionTexts = [...optionTexts];
    newOptionTexts.splice(index, 1);
    setOptionTexts(newOptionTexts);
    const newIsEditingOption = [...isEditingOption];
    newIsEditingOption.splice(index, 1);
    setIsEditingOption(newIsEditingOption);
  };

  const handleCancelQuestion = () => {
    setQuestionText(question);
    setIsEditingQuestion(false);
  };

  const handleSaveQuestion = () => {
    setIsEditingQuestion(false);
  };

  const handleEditOption = (index) => {
    const newIsEditingOption = [...isEditingOption];
    newIsEditingOption[index] = true;
    setIsEditingOption(newIsEditingOption);
  };

  const handleCancelOption = (index) => {
    const newOptionTexts = [...optionTexts];
    newOptionTexts[index] = options[index];
    setOptionTexts(newOptionTexts);
    const newIsEditingOption = [...isEditingOption];
    newIsEditingOption[index] = false;
    setIsEditingOption(newIsEditingOption);
  };

  const handleSaveOption = (index) => {
    const newIsEditingOption = [...isEditingOption];
    newIsEditingOption[index] = false;
    setIsEditingOption(newIsEditingOption);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {isEditingQuestion ? (
        <div className="flex items-center space-x-4 mb-2">
          <input type="text" value={questionText} onChange={handleQuestionChange} className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-main focus:border-main sm:text-sm" />
          <button onClick={handleSaveQuestion} className="text-green-500 hover:text-green-600">
            <Check size={20} />
          </button>
          <button onClick={handleCancelQuestion} className="text-red-500 hover:text-red-600">
            <X size={20} />
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-4 mb-2">
          <h3 className="font-medium">{questionText}</h3>
          <button onClick={() => setIsEditingQuestion(true)} className="text-gray-500 hover:text-gray-600">
            <EditAlt size={20} />
          </button>
        </div>
      )}
      {optionTexts.map((optionText, index) => (
        <div key={index} className="flex items-center space-x-4 mb-2">
          {isEditingOption[index] ? (
            <div className="flex items-center space-x-4">
              <input type="text" value={optionText} onChange={(e) => handleOptionChange(e, index)} className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-main focus:border-main sm:text-sm" />
              <button onClick={() => handleSaveOption(index)} className="text-green-500 hover:text-green-600">
                <Check size={20} />
              </button>
              <button onClick={() => handleCancelOption(index)} className="text-red-500 hover:text-red-600">
                <X size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              {isMultipleChoice ? (
                <input type="checkbox" id={`option${index}`} name={`option${index}`} value={optionText} className="h-5 w-5 text-main focus:ring-main border-gray-300 rounded" />
              ) : (
                <input type="radio" id={`option${index}`} name="options" value={optionText} className="h-5 w-5 text-main focus:ring-main border-gray-300 rounded" />
              )}
              <label htmlFor={`option${index}`} className="block text-sm font-medium">{optionText}</label>
              <button onClick={() => handleEditOption(index)} className="text-gray-500 hover:text-gray-600">
                <EditAlt size={20} />
              </button>
              <button onClick={() => handleRemoveOption(index)} className="text-red-500 hover:text-red-600">
                <TrashAlt size={20} />
              </button>
            </div>
          )}
        </div>
      ))}
      <button onClick={handleAddOption} className="text-main hover:font-bold">
        + Add Option
      </button>
    </div>
  );
}

export default QuestionBlockEdit;