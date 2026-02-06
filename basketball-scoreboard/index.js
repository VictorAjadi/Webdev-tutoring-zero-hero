const teamA = document.getElementById("team-a-score");
const teamB = document.getElementById("team-b-score");
let teamAScore = Number(teamA.textContent);
let teamBScore = Number(teamB.textContent);

const  all = document.querySelectorAll("button");
for (const each of all){
    each.addEventListener("click", function(){
        const team = each.dataset.team;
        const points = parseInt(each.dataset.point);
        addPoints(team, points);
    });
}
function addPoints(team, points) {
    if (team === "A") {
        teamAScore += points;
        teamA.textContent = teamAScore;
    } else if (team === "B") {
        teamBScore += points;
        teamB.textContent = teamBScore;
    } else{
        console.error("Invalid team identifier. Use 'A' or 'B'.");
    }
}