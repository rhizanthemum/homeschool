import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Gift, Star, Lock } from 'lucide-react';

const RewardsStore = ({ studentPoints = 350 }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [redeemStatus, setRedeemStatus] = useState(null);

  const rewards = [
    {
      id: 1,
      tier: 'Bronze',
      name: 'Extra Gaming Time',
      description: '30 minutes of additional gaming time',
      points: 100,
      icon: '🎮'
    },
    {
      id: 2,
      tier: 'Bronze',
      name: 'Movie Night',
      description: 'Pick a movie for family movie night',
      points: 100,
      icon: '🎬'
    },
    {
      id: 3,
      tier: 'Silver',
      name: 'New Book',
      description: 'Choose a new book to read',
      points: 300,
      icon: '📚'
    },
    {
      id: 4,
      tier: 'Gold',
      name: 'Day Trip',
      description: 'Plan a day trip to a nearby attraction',
      points: 500,
      icon: '🚗'
    }
  ];

  const handleRedeem = async () => {
    try {
      // API call would go here to handle redemption
      setRedeemStatus({
        success: true,
        message: `Successfully redeemed ${selectedReward.name}! Dad will review your request.`
      });
      setShowConfirmation(false);
      setSelectedReward(null);
    } catch (error) {
      setRedeemStatus({
        success: false,
        message: 'Something went wrong. Please try again.'
      });
    }
  };

  const RewardCard = ({ reward }) => {
    const isAffordable = studentPoints >= reward.points;

    return (
      <Card className={`relative transition-all ${
        isAffordable ? 'hover:shadow-lg' : 'opacity-75'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{reward.icon}</div>
            <div className="flex-1">
              <h3 className="font-semibold">{reward.name}</h3>
              <p className="text-sm text-gray-600">{reward.description}</p>
              <div className="flex items-center mt-2">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium">{reward.points} points</span>
              </div>
            </div>
            
            {isAffordable ? (
              <Button 
                onClick={() => {
                  setSelectedReward(reward);
                  setShowConfirmation(true);
                }}
                className="ml-auto"
              >
                Redeem
                <Gift className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <div className="ml-auto flex items-center gap-2 text-gray-500">
                <Lock className="w-4 h-4" />
                <span className="text-sm">Locked</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Rewards Store</h1>
        <div className="flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-500" />
          <span className="text-2xl font-bold">{studentPoints}</span>
        </div>
      </div>

      {showConfirmation && selectedReward && (
        <Alert className="mb-6">
          <AlertDescription className="flex items-center justify-between">
            <span>
              Redeem {selectedReward.name} for {selectedReward.points} points?
            </span>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="default"
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={handleRedeem}
              >
                Confirm
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {redeemStatus && (
        <Alert 
          className={`mb-6 ${
            redeemStatus.success ? 'bg-green-50' : 'bg-red-50'
          }`}
        >
          <AlertDescription>{redeemStatus.message}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {rewards.map((reward) => (
          <RewardCard key={reward.id} reward={reward} />
        ))}
      </div>
    </div>
  );
};

export default RewardsStore;