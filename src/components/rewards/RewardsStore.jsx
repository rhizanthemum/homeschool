import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Gift, Star, Lock } from 'lucide-react';

const RewardsStore = ({ studentPoints = 350 }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);

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

  const handleRedeem = () => {
    // Handle redemption logic here
    set