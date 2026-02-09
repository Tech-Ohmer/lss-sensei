# Green Belt: The Statistics of Success

Now we enter the realm of the **Data Scientist**. As a Green Belt, you don't just find problems; you prove they exist using numbers.

## Process Capability (Cp & Cpk)
Capability tells us if our process can meet the customer's expectations (The Voice of the Customer). 
- If your **Cpk is < 1.33**, your process is "flirting with failure."
- **Black Belt Tip**: Always look for the "Tail" of your distribution. That's where the defects hide.

## Hypothesis Testing: Guilt vs. Innocence
Statistical tests (T-Tests, ANOVA) are like a courtroom. 
- **Null Hypothesis (H0)**: "Everything is fine, nothing changed."
- **Alternative Hypothesis (Ha)**: "We found a difference!"
- If your **P-Value is < 0.05**, the evidence is strong enough to convict the variable!

### 📊 Real-World Example: Insurance Claims
A Green Belt noticed that claims from the "East Region" took 3 days longer. After a T-Test proved the difference was statistically significant, they discovered a "Motion" waste in how documents were scanned in that specific office.

---
## Sample Project Idea (Green Belt)
**"API Latency Reduction"**
Collect data on system response times. Use a Histogram to see the distribution. Perform a Correlation analysis between "Server Load" and "Latency" to identify the tipping point where performance degrades.