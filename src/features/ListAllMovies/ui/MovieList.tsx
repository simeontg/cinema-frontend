import { FC, useState } from "react"
import { MovieItem } from "./MovieItem";
import { Button, Tabs, Tab } from "shared/ui";
import { movies } from './mock';

interface MovieListProps {

}

export const MovieList: FC<MovieListProps> = () => {
    const [tabValue, setTabValue] = useState(0);

    return (
        <div className="max-w-[1400px] block m-auto">
            <Tabs value={tabValue} className="ml-10">
                <Tab onClick={() => setTabValue(0)} className="text-lg" label="WHAT'S ON"></Tab>
                <Tab onClick={() => setTabValue(1)} label="WHAT'S COMING"></Tab>
            </Tabs>
            <div className="flex gap-8 flex-wrap mt-5 mb-8 pl-10 max-w-[1400px]">
                {tabValue === 0 && movies.map((movie) => <MovieItem genre={movie.genre} duration={movie.duration} title={movie.title} imageUrl={movie.imageUrl}/>)}
            </div>
            <Button variant="outlined">Load More</Button>
        </div>
    )
}