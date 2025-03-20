
export default function ResearchProject()   
{
    return(
                <div className="sectionElements">
                    <h2>Market Basket Analysis using K-Means Clustering Techniques</h2>
                    <p>For my final year project in university, I created a web application that uses machine learning to predict the outcome of a cricket match. The application uses a dataset of cricket matches from the past 10 years to train a model that predicts the winner of a match based on the teams playing, the venue, and the toss winner. The application also provides a live scorecard for ongoing matches and a leaderboard of the top predictors.</p>
                    <p>The project was built using React for the frontend and Flask for the backend. The machine learning model was trained using the scikit-learn library in Python. The application was deployed on Heroku and is available at <a href="https://cricket-predictor.herokuapp.com/">https://cricket-predictor.herokuapp.com/</a>.</p>
                </div>
    )
}