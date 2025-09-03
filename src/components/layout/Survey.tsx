'use client';

import React from 'react';
import { useSurveyData, SurveyType } from '@/hooks/useSurveyData';
import { request } from '@/lib/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SurveySlider } from './SurveySlider';

interface SurveyProps {
    type: SurveyType;
}

export function Survey({ type }: SurveyProps) {
    const { data: surveys, isLoading, error } = useSurveyData(type);
    const queryClient = useQueryClient();

    const recommendMutation = useMutation({
        mutationFn: (id: string) => request(`/surveys/${id}/recommend`, { method: 'PATCH' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['survey', { type }] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => request(`/surveys/${id}`, { method: 'DELETE' }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['survey', { type }] });
        },
    });

    const handleRecommend = (id: string) => {
        recommendMutation.mutate(id);
    };

    const handleDelete = (id: string) => {
        deleteMutation.mutate(id);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading surveys</div>;

    const sortedSurveys = surveys?.sort((a, b) => b.recommendUsers.length - a.recommendUsers.length);

    return (
        <div className="w-full mb-8">
            {sortedSurveys && sortedSurveys.length > 0 ? (
                <SurveySlider surveys={sortedSurveys} onDelete={handleDelete} onLike={handleRecommend} />
            ) : (
                <div className="text-center py-12">
                    <p className="text-lg text-gray-500">아직 등록된 설문이 없습니다.</p>
                </div>
            )}
        </div>
    );
}
