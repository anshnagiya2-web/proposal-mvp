import { Input, Label, Textarea } from "@/components/ui/Field";
import { ProposalData } from "@/lib/types";

export function StepProposalPage3({
  data,
  onChange,
}: {
  data: ProposalData;
  onChange: (patch: Partial<ProposalData>) => void;
}) {
  const page3 = data.page3;

  function patchPage3(p: Partial<ProposalData["page3"]>) {
    onChange({ page3: { ...page3, ...p } });
  }

  function setOption(i: number, value: string) {
    const options = [...page3.options] as [string, string, string];
    options[i] = value;
    patchPage3({ options });
  }

  function setResponse(i: number, value: string) {
    const responses = [...page3.responses] as [string, string, string];
    responses[i] = value;
    patchPage3({ responses });
  }

  return (
    <div>
      <h2 className="font-display text-2xl text-ink sm:text-3xl">
        Page 3 · Interaction &amp; guessing game
      </h2>
      <p className="mt-2 text-sm text-ink-dim">
        What they see right after choosing YES or NO on page 2, followed by a
        little guessing game.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        <div>
          <Label>If they said YES</Label>
          <Input
            value={page3.yesText}
            onChange={(e) => patchPage3({ yesText: e.target.value })}
            placeholder="Good to know that you want to know... ❤️"
            maxLength={120}
          />
        </div>
        <div>
          <Label hint="one line per beat">If they said NO</Label>
          <Textarea
            value={page3.noText}
            onChange={(e) => patchPage3({ noText: e.target.value })}
            rows={3}
            maxLength={200}
          />
        </div>

        <div className="border-t border-line pt-6">
          <p className="text-sm text-ink">Guessing game</p>
          <div className="mt-4 flex flex-col gap-4">
            <div>
              <Label>Intro line</Label>
              <Input
                value={page3.gameIntro}
                onChange={(e) => patchPage3({ gameIntro: e.target.value })}
                placeholder="Before I tell you... let's play a little game. 👀"
                maxLength={120}
              />
            </div>
            <div>
              <Label>Question</Label>
              <Input
                value={page3.gameQuestion}
                onChange={(e) => patchPage3({ gameQuestion: e.target.value })}
                placeholder="What do you think is waiting for you?"
                maxLength={120}
              />
            </div>
            <div>
              <Label>Answer options</Label>
              <div className="flex flex-col gap-2">
                {page3.options.map((opt, i) => (
                  <Input
                    key={i}
                    value={opt}
                    onChange={(e) => setOption(i, e.target.value)}
                    placeholder={`Option ${i + 1}`}
                    maxLength={60}
                  />
                ))}
              </div>
            </div>
            <div>
              <Label>Responses (matched to each option above)</Label>
              <div className="flex flex-col gap-2">
                {page3.responses.map((resp, i) => (
                  <Input
                    key={i}
                    value={resp}
                    onChange={(e) => setResponse(i, e.target.value)}
                    placeholder={`Response to option ${i + 1}`}
                    maxLength={100}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
