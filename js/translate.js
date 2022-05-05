translate


			Array.prototype.toObservable = function() {
				return Rx.Observable.FromArray(this);
			};

			function translate(text, from, to) {
				var subject = new Rx.AsyncSubject();

				Microsoft.Translator.translate(
					text,
					from,
					to,
					function(translation) {
						subject.OnNext(translation);
						subject.OnCompleted();
				});

				return subject.AsObservable();
			}

			function detect(text) {
				var subject = new Rx.AsyncSubject();

				Microsoft.Translator.detect(
					text,
					function(result) {
						subject.OnNext(result);
						subject.OnCompleted();
				});

				return subject.AsObservable();
			}

			function getLanguageNames(locale) {
				return Rx.Observable.Start(function() {
					return Microsoft.Translator.getLanguageNames(locale).toObservable();
				}).MergeObservable();
			}

			function getLanguages() {
				return Rx.Observable.Start(function() {
					return Microsoft.Translator.getLanguages().toObservable();
				}).MergeObservable();
			}

			$(document).ready(function() {

				$("#translateCommand").ToObservable("click").Subscribe(function(event) {

					var translatedText = $("#translateText").val();
					$("#translatedText").empty();

					var detected = detect(translatedText);
					var translator = detected
						.Do(function(detected) {
							$("#detectedText").html("Detected " + detected);
						})
						.SelectMany(function(detected) {
							return getLanguages()
								.Where(function(language) { return language != detected; })
								.SelectMany(function(language) {
									return translate(translatedText, detected, language)
										.Select(function(translatedText) {
											return { translated : translatedText, language : language };
									});
							});
					});

					translator.Subscribe(function(translatedItem) {
						$("#translatedText").append("<li>"+translatedItem.language+"-"+translatedItem.translated+"</li>");
					});
				});

			});