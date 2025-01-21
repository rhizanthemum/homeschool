import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle } from 'lucide-react';

const DailyProgressEntry = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    subjects: {
      mathematics: {
        completed: false,
        lessonName: '',
        score: '',
        timeSpent: '',
        funRating: 5,
        notes: ''
      },
      languageArts: {
        completed: false,
        lessonName: '',
        score: '',
        timeSpent: '',
        funRating: 5,
        notes: ''
      },
      science: {
        completed: false,
        lessonName: '',
        score: '',
        timeSpent: '',
        funRating: 5,
        notes: ''
      },
      socialStudies: {
        completed: false,
        lessonName: '',
        score: '',
        timeSpent: '',
        funRating: 5,
        notes: ''
      }
    },
    todaysHighlight: '',
    questions: ''
  });

  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const handleSubjectComplete = (subject) => {
    setFormData(prev => ({
      ...prev,
      subjects: {
        ...prev.subjects,
        [subject]: {
          ...prev.subjects[subject],
          completed: !prev.subjects[subject].completed
        }
      }
    }));
  };

  const handleFunRating = (subject, rating) => {
    setFormData(prev => ({
      ...prev,
      subjects: {
        ...prev.subjects,
        [subject]: {
          ...prev.subjects[subject],
          funRating: rating
        }
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call would go here
      setSubmitStatus({
        submitted: true,
        success: true,
        message: 'Great job! Your progress has been saved.'
      });
    } catch (error) {
      setSubmitStatus({
        submitted: true,
        success: false,
        message: 'Oops! Something went wrong. Please try again.'
      });
    }
  };

  const emojis = ['😕', '🙂', '😊', '😃', '🤩'];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center justify-between">
          My Learning Journey Today
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({...prev, date: e.target.value}))}
            className="w-40"
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.entries(formData.subjects).map(([subject, data]) => (
            <div key={subject} 
                 className={\`p-4 rounded-lg border-2 transition-all \${
                   data.completed ? 'border-green-500 bg-green-50' : 'border-gray-200'
                 }\`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold capitalize flex items-center gap-2">
                  {subject}
                  <Button 
                    type="button"
                    variant={data.completed ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSubjectComplete(subject)}
                  >
                    {data.completed ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Done!
                      </span>
                    ) : 'Mark Complete'}
                  </Button>
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm mb-1">What did you work on?</label>
                  <Input
                    placeholder="Lesson or activity name"
                    value={data.lessonName}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      subjects: {
                        ...prev.subjects,
                        [subject]: {
                          ...prev.subjects[subject],
                          lessonName: e.target.value
                        }
                      }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Score (if any)</label>
                  <Input
                    placeholder="Your score"
                    value={data.score}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      subjects: {
                        ...prev.subjects,
                        [subject]: {
                          ...prev.subjects[subject],
                          score: e.target.value
                        }
                      }
                    }))}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-1">How long did you spend? (minutes)</label>
                <Input
                  type="number"
                  placeholder="Time in minutes"
                  value={data.timeSpent}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    subjects: {
                      ...prev.subjects,
                      [subject]: {
                        ...prev.subjects[subject],
                        timeSpent: e.target.value
                      }
                    }
                  }))}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2">How fun was it?</label>
                <div className="flex gap-2">
                  {emojis.map((emoji, index) => (
                    <Button
                      key={index}
                      type="button"
                      variant={data.funRating === index + 1 ? "default" : "outline"}
                      className="w-10 h-10 p-0"
                      onClick={() => handleFunRating(subject, index + 1)}
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Notes (optional)</label>
                <Textarea
                  placeholder="What did you learn? What was interesting?"
                  value={data.notes}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    subjects: {
                      ...prev.subjects,
                      [subject]: {
                        ...prev.subjects[subject],
                        notes: e.target.value
                      }
                    }
                  }))}
                  rows={2}
                />
              </div>
            </div>
          ))}

          <div>
            <label className="block text-lg font-semibold mb-2">Today's Highlight! 🌟</label>
            <Textarea
              placeholder="What was the best part of your learning today?"
              value={formData.todaysHighlight}
              onChange={(e) => setFormData(prev => ({...prev, todaysHighlight: e.target.value}))}
              rows={2}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Questions for Dad? 🤔</label>
            <Textarea
              placeholder="Write any questions you want to ask about today's lessons"
              value={formData.questions}
              onChange={(e) => setFormData(prev => ({...prev, questions: e.target.value}))}
              rows={2}
            />
          </div>

          {submitStatus.submitted && (
            <Alert variant={submitStatus.success ? "default" : "destructive"}>
              <AlertDescription>{submitStatus.message}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full">
            Save My Progress
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DailyProgressEntry;