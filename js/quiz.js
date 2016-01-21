(function(){

	var app = angular.module('myQuiz', [])

    app.controller('QuizController', ['$scope', '$http', '$sce', function($scope, $http, $sce) {

        $scope.score = 0;
        $scope.activeQuestion = -1;
        $scope.activeQuestionAnswered = 0;
        $scope.percentage = 0;

        //quizData is equal to the quiz_data.json data
        $http.get('quiz_data.json').then(function(quizData) {
            $scope.myQuestions = quizData.data;
            $scope.totalQuestions = $scope.myQuestions.length;
        });

        $scope.selectAnswer = function(qIndex, aIndex) {
            var questionState = $scope.myQuestions[qIndex].questionState;

            if(questionState != 'answered') {
                $scope.myQuestions[qIndex].selectedAnswer = aIndex;
                var correctAnswer = $scope.myQuestions[qIndex].correct;
                $scope.myQuestions[qIndex].correctAnswer = correctAnswer;

                if(aIndex === correctAnswer) {
                    $scope.myQuestions[qIndex].correctness = 'correct';
                    $scope.score += 1;
                } else {
                    $scope.myQuestions[qIndex].correctness = 'incorrect';
                }
                $scope.myQuestions[qIndex].questionState = 'answered';
            };

            $scope.percentage = ($scope.score / $scope.totalQuestions)*100;


        };

        $scope.isSelected = function(qIndex, aIndex) {
            return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
        };

        $scope.isCorrect = function(qIndex, aIndex) {
            return $scope.myQuestions[qIndex].correctAnswer === aIndex;
        };

        $scope.selectContinue = function() {
            return $scope.activeQuestion +=1;
        };

        $scope.createShareLinks = function(percentage) {
            var url = 'http://carlosmariomejia.com';
            emailLink = '<a class="btn email" href="mailto:?subject=Try to beat my high Score!&amp;body=I scored ' +percentage+ '% on this quiz about Saturn. Try to beat me at ' +url+'">Email a Friend</a>';
            twitterLink = '<a class="btn twitter" target="_blank" href="http://twitter.com/share?text=I scored ' +percentage+ '% on this quiz about Saturn.&amp;hashtags=SaturnQuiz&url='+url+'">Tweet your Score!</a>';
            newMarkup = emailLink + twitterLink;
            return $sce.trustAsHtml(newMarkup);
        }

    }]);

})();