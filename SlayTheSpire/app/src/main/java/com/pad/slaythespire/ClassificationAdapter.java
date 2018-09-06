package com.pad.slaythespire;

import android.app.FragmentManager;
import android.support.annotation.NonNull;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.database.DataSnapshot;

import java.util.ArrayList;

public class ClassificationAdapter
        extends RecyclerView.Adapter<ClassificationAdapter.ViewHolderClassification>
        implements View.OnClickListener{

    private ArrayList<String> dataList;
    private View.OnClickListener listener;
    private ArrayList<DataSnapshot> users;

    public ClassificationAdapter() {
    }

    // enlaza el adaptador con la lista de items
    @NonNull
    @Override
    public ViewHolderClassification onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.list_players,null,false);
        view.setOnClickListener(this);
        return new ViewHolderClassification(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolderClassification holder, int position) {
        holder.assignData(users.get(position), position);

    }

    @Override
    public int getItemCount() {
        return users.size();
    }

    @Override
    public void onClick(View v) {
        if(listener!=null){
            listener.onClick(v);
        }
    }

    public void addData(ArrayList<DataSnapshot> users){
        this.users = users;
    }

    public void setOnClickListener(View.OnClickListener listener){
        this.listener = listener;
    }

    public class ViewHolderClassification extends RecyclerView.ViewHolder {

        TextView name;
        ImageView imageView;
        TextView rank;
        TextView level;
        TextView matches;
        TextView maxScore;
        TextView friendRequest;
        private CardView cardView;

        public ViewHolderClassification(View itemView) {
            super(itemView);
            name = itemView.findViewById(R.id.card_template_name);
            rank = itemView.findViewById(R.id.card_template_rank);
            level = itemView.findViewById(R.id.card_template_level);
            matches = itemView.findViewById(R.id.card_template_matches);
            maxScore = itemView.findViewById(R.id.card_template_score);
            friendRequest = itemView.findViewById(R.id.card_template_friend_request);

            //imageView = itemView.findViewById(R.id.card_template_image);
        }

        public void assignData(DataSnapshot s, int index) {
            name.setText(s.child("name").getValue().toString());
            rank.setText("Rank: " + Integer.toString(index));
            level.setText("Lv:" + s.child("level").getValue().toString());
            matches.setText("Matches: " + s.child("matches").getValue().toString());
            maxScore.setText("Score: "+ s.child("points").getValue().toString());
            if(s.child("protect").getValue().toString().equalsIgnoreCase("true")){
                friendRequest.setVisibility(View.INVISIBLE);
            }
        }
    }
}
