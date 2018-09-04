package com.pad.slaythespire;

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

    public ClassificationAdapter(ArrayList<String> dataList, ArrayList<DataSnapshot> users) {
        this.dataList = dataList;
        this.users = users;
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

    public void setOnClickListener(View.OnClickListener listener){
        this.listener = listener;
    }

    public class ViewHolderClassification extends RecyclerView.ViewHolder {

        TextView textView;
        ImageView imageView;
        TextView rank;

        private CardView cardView;

        public ViewHolderClassification(View itemView) {
            super(itemView);
            textView = itemView.findViewById(R.id.card_template_name);
            rank = itemView.findViewById(R.id.card_template_rank);
            //imageView = itemView.findViewById(R.id.card_template_image);
        }

        public void assignData(DataSnapshot s, int index) {
            textView.setText(s.child("name").getValue().toString());
            rank.setText(Integer.toString(index));
        }
    }
}
