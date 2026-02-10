'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type QuoteCardProps = {
  quote: string | undefined | null;
  isLoading: boolean;
};

export function QuoteCard({ quote, isLoading }: QuoteCardProps) {
  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl animate-pulse">
        <CardContent className="pt-6">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-5/6" />
          <div className="flex justify-end mt-4">
            <Skeleton className="h-4 w-1/4" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!quote) {
    return (
      <Card className="w-full max-w-2xl bg-transparent border-dashed">
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground font-headline text-xl">Select a mood to get a quote</p>
        </CardContent>
      </Card>
    );
  }

  const hasAuthor = quote.includes(' - ');
  const quoteText = hasAuthor ? quote.substring(0, quote.lastIndexOf(' - ')) : quote;
  const author = hasAuthor ? quote.substring(quote.lastIndexOf(' - ') + 3) : null;

  return (
    <div className="w-full max-w-2xl animate-in fade-in-50 duration-500">
      <Card className="shadow-2xl">
        <CardContent className="pt-6">
          <blockquote className="text-center">
            <p className="font-body text-2xl lg:text-3xl leading-relaxed">
              &ldquo;{quoteText}&rdquo;
            </p>
            {author && (
              <footer className="mt-6 font-headline text-xl text-muted-foreground">
                &mdash; {author}
              </footer>
            )}
          </blockquote>
        </CardContent>
      </Card>
    </div>
  );
}
